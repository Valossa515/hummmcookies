package br.com.hummmcookies.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.hummmcookies.domain.Endereco;

@Repository 
public interface EnderecoRepository extends JpaRepository<Endereco, Integer>{
	
}
