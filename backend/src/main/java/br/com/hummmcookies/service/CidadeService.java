package br.com.hummmcookies.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.hummmcookies.domain.Cidade;
import br.com.hummmcookies.repositories.CidadeRepository;

@Service
public class CidadeService {
	@Autowired
	private CidadeRepository repo;

	public List<Cidade> findByEstado(Integer estadoId) {
		return repo.findCidades(estadoId);
	}
}
