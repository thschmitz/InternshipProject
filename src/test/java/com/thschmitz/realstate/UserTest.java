package com.thschmitz.realstate;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.AuthenticationException;
import com.thschmitz.realstate.exception.Unauthorized;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.UserService;
import com.thschmitz.realstate.util.Password;
import com.thschmitz.realstate.util.Util;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class UserTest {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;

	@Test
	void checkMariaPasswordBCryption() {
		var maria = new Users();
		var mariaBCrypted = new Users();

		String password = "maria05";
		String passwordCrypted = "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri";
		maria.setPassword(password);
		mariaBCrypted.setPassword(passwordCrypted);
		
		Password.encodePassword(maria);
		
		assertTrue(Password.matchPassword(maria, mariaBCrypted));
		
	}
	
	private Boolean checkIfUserIsAdmin(Users user) {
		return user.getAdmin();
	}
	
	@Test
	void checkIfPostBelongsToCertainAdmin() {
		var maria = new Users();
		maria.setAdmin(true);
		maria.setId(235);
		
		assertTrue(checkIfUserIsAdmin(maria));
		assertDoesNotThrow(() -> {Util.isAllowed(362, 244, postService);});
		assertThrows(Unauthorized.class, () -> {Util.isAllowed(362, 245, postService);});
	}
	
	@Test
	void loginSucessWithMariaInfo() {
		var maria = new Users();
		
		maria.setEmail("maria@gmail.com");
		maria.setPassword("maria05");
		
		userService.login(maria);
		
		assertEquals("Maria Brown", maria.getName());
	}
	
	@Test
	void loginFailure() {
		var maria = new Users();
		
		maria.setEmail("maria@gmail.com");
		maria.setPassword("maria04"); // The password here is incorrect -> maria05 is the right one.
		
		assertThrows(AuthenticationException.class, () -> {userService.login(maria);});
	}

}
