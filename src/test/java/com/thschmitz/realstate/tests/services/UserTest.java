package com.thschmitz.realstate.tests.services;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.AuthenticationException;
import com.thschmitz.realstate.exception.InvalidJWT;
import com.thschmitz.realstate.exception.MissingRequestHeaderException;
import com.thschmitz.realstate.exception.Unauthorized;
import com.thschmitz.realstate.repository.UserRepository;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.UserService;
import com.thschmitz.realstate.util.JWT;
import com.thschmitz.realstate.util.Password;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class UserTest {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	@InjectMocks
	private UserService userService;
	
	@Mock
	UserRepository userRepository;
	
	private Users maria;

	@BeforeEach
	void setup() throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		maria = new Users(255, "Maria Brown", "maria@gmail.com", "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000", true, 996969102);
	}
	
	@Test
	void checkMariaPasswordBCryption() {
		var maria = new Users();

		String password = "maria05";
		maria.setPassword(password);
		
		Password.encodePassword(maria);
		
		assertTrue(Password.matchPassword(maria, this.maria));
		
	}
	
	private Boolean checkIfUserIsAdmin(Users user) {
		return user.getAdmin();
	}
	
	@Test
	void checkIfPostBelongsToCertainAdmin() {
		assertTrue(checkIfUserIsAdmin(maria));
		assertDoesNotThrow(() -> {Util.isAllowed(362, 244, postService);});
		assertThrows(Unauthorized.class, () -> {Util.isAllowed(362, 245, postService);});
	}
	
	@Test
	void loginSucessWithMariaInfo() {

		var mariaTest = new Users();
		
		mariaTest.setEmail("maria@gmail.com");
		mariaTest.setPassword("maria05");
		

		Mockito.when(userRepository.findByEmail(maria.getEmail())).thenReturn(this.maria);
		
		try(MockedStatic<Password> utilities = Mockito.mockStatic(Password.class)) {
			utilities.when(() -> Password.matchPassword(mariaTest, this.maria)).thenReturn(true);
			
			assertTrue(Password.matchPassword(mariaTest, this.maria));
		}
		
		try (MockedStatic<JWT> utilities = Mockito.mockStatic(JWT.class)){
			utilities.when(() -> JWT.createJWT(this.maria)).thenReturn("Maria Brown");

			assertEquals("Maria Brown", JWT.createJWT(maria));
		}
		
		userService.login(mariaTest);
		
		Mockito.verify(userRepository).findByEmail(mariaTest.getEmail());
	}
	
	@Test
	void loginFailure() {
		var maria = new Users();
		
		maria.setEmail("maria@gmail.com");
		maria.setPassword("maria04"); // The password here is incorrect -> maria05 is the right one.
		
		assertThrows(AuthenticationException.class, () -> {userService.login(maria);});
	}
	
	@Test
	void mariaIsNotEmpty() {
		assertFalse(maria.isEmpty());
	}
	
	@Test
	void JWTForMariaIsCorrectGenerating() {
		String jwtMaria = JWT.createJWT(maria);
		Jws<Claims> validationMaria = JWT.validateJWT(jwtMaria);
		
		Integer author_id = (Integer) validationMaria.getBody().get("id");
		Boolean idCompare = author_id.equals(maria.getId());
		
		assertTrue(idCompare);
	}
	
	@Test
	void returnsUndefinedJWTExceptionHandled() {
		assertThrows(RuntimeException.class, () -> Session.session(""));
	}
	
	// PROBLEM
	@Test
	void returnsInvalidJWTExceptionHandled() {
		assertThrows(InvalidJWT.class, () -> Session.session("ounsgerugergpioasddifdija"));
	}
	
	@Test
	void returnsNoneJWTExceptionHandled() {
		assertThrows(MissingRequestHeaderException.class, () -> Session.session(null));
	}

}
