package br.com.hummmcookies.resource;

import java.util.Collection;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.hummmcookies.dto.EmailDTO;
import br.com.hummmcookies.security.JWTUtil;
import br.com.hummmcookies.security.UserSS;
import br.com.hummmcookies.service.AuthService;
import br.com.hummmcookies.service.UserService;

@RestController
@RequestMapping(value = "/auth")
public class AuthResource {
	
	@Autowired
	private JWTUtil jwtUtil;
	@Autowired
	private AuthService authService;
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/refresh_token", method = RequestMethod.POST)
	public ResponseEntity<Void> refreshToken(HttpServletResponse response) {
		UserSS user = UserService.authenticated();
		Collection<GrantedAuthority> perfil = (Collection<GrantedAuthority>) user.getAuthorities();
		String token = jwtUtil.generateToken(user.getUsername(),perfil);
		response.addHeader("Authorization", "Bearer " + token);
		response.addHeader("access-control-expose-headers", "Authorization");
		return ResponseEntity.noContent().build();
	}
	@RequestMapping(value = "/forgot", method = RequestMethod.POST)
	public ResponseEntity<Void> forgot(@Valid @RequestBody EmailDTO objdto) {
		authService.sendNewPassword(objdto.getEmail());
		return ResponseEntity.noContent().build();
	}
}
