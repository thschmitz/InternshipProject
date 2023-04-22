package com.thschmitz.realstate;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.util.JWT;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class JWTTest {

	@Test
	void generateSuccessJWTForMaria() {
		var maria = new Users();
		
		maria.setId(244);
		maria.setName("Maria Brown");
		maria.setAdmin(true);
		
		assertDoesNotThrow(() -> {JWT.createJWT(maria);});
	}
	
	@Test
	void generateErrorJWTForMaria() {
		var maria = new Users();
		
		maria.setName("Maria Brown");
		
		assertThrows(NullPointerException.class, () -> {JWT.createJWT(maria);});
	}
	
	@Test
	void validateJWTSuccessForMaria() {
		var maria = new Users();
		
		maria.setId(244);
		maria.setName("Maria Brown");
		maria.setAdmin(true);
		
		String jwt = JWT.createJWT(maria);
		
		assertDoesNotThrow(() -> {JWT.validateJWT(jwt);});
	}
	
	@Test
	void validateJWTErrorForMaria() {
		var maria = new Users();
		
		maria.setId(244);
		maria.setName("Maria Brown");
		maria.setAdmin(true);
		
		String jwt = JWT.createJWT(maria);
		
		assertThrows(NullPointerException.class, () ->  {JWT.validateJWT(jwt+"a");});
	}
}