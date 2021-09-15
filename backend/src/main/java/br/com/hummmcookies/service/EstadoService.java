package br.com.hummmcookies.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.hummmcookies.domain.Estado;
import br.com.hummmcookies.repositories.EstadoRepository;

@Service
public class EstadoService {
	@Autowired
	private EstadoRepository repo;
	
	public List<Estado> findAll()
	{
		return repo.findAllByOrderByNome();
	}
}
