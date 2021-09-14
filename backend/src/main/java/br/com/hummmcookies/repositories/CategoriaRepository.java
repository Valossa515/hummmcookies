package br.com.hummmcookies.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.hummmcookies.domain.Categoria;

@Repository 
public interface CategoriaRepository extends JpaRepository<Categoria, Integer>{
	
}
