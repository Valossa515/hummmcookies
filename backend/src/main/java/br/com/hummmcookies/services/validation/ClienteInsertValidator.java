package br.com.hummmcookies.services.validation;
import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.hummmcookies.domain.Cliente;
import br.com.hummmcookies.dto.ClienteNewDTO;
import br.com.hummmcookies.enums.TipoCliente;
import br.com.hummmcookies.repositories.ClienteRepository;
import br.com.hummmcookies.resources.exceptionhandler.FieldMessage;
import br.com.hummmcookies.services.validation.utils.BR;

public class ClienteInsertValidator implements ConstraintValidator<ClienteInsert, ClienteNewDTO> {

	@Autowired
	private ClienteRepository clienteReporitory;
	@Override
	public void initialize(ClienteInsert ann) {

	}

	@Override
	public boolean isValid(ClienteNewDTO objDto, ConstraintValidatorContext context) {
		List<FieldMessage> list = new ArrayList<>();
		
		if(objDto.getTipo().equals(TipoCliente.PESSOAFISICA.getCod()) && !BR.isValidCPF(objDto.getCpfOuCnpj()))
		{
		  list.add(new FieldMessage("cpfOuCnpj", "CPF inválido"));
		}
		if(objDto.getTipo().equals(TipoCliente.PESSOAJURIDICA.getCod()) && !BR.isValidCNPJ(objDto.getCpfOuCnpj()))
		{
		  list.add(new FieldMessage("cpfOuCnpj", "CNPJ inválido"));
		}
		
		Cliente aux = clienteReporitory.findByEmail(objDto.getEmail());
		
		if(aux != null)
		{
			list.add(new FieldMessage("email", "Email já existente!!!"));
		}
		
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldNmae())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
