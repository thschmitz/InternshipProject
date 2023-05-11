package com.thschmitz.realstate.tests.util;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.InvalidJWT;
import com.thschmitz.realstate.exception.MissingRequestHeaderException;
import com.thschmitz.realstate.util.JWT;
import com.thschmitz.realstate.util.Session;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class JWTTest {

	private Users maria;
	
	@BeforeEach
	void setup() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		maria = new Users(244, "Maria Brown", "maria@gmail.com", "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000", true, 996969102);
	}
	
	@Test
	void generateSuccessJWTForMaria() {
		assertDoesNotThrow(() -> {JWT.createJWT(maria);});
	}
	
	@Test
	void generateErrorJWTForMaria() {
		maria.setAdmin(null);
		maria.setId(null);
		assertThrows(MissingRequestHeaderException.class, () -> {JWT.createJWT(maria);});
	}
	
	@Test
	void validateJWTSuccessForMaria() {
		String jwt = JWT.createJWT(maria);
		
		assertDoesNotThrow(() -> {JWT.validateJWT(jwt);});
	}
	
	@Test
	void returnsInvalidJWTExceptionHandled() {
		assertThrows(InvalidJWT.class, () -> Session.session("ounsgerugergpioasddifdija"));
	}
	
	@Test
	void returnsNoneJWTExceptionHandled() {
		assertThrows(MissingRequestHeaderException.class, () -> Session.session(null));
	}
}