package br.com.hummmcookies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.hummmcookies.domain.Cidade;
import br.com.hummmcookies.dto.CidadeDTO;
import br.com.hummmcookies.repositories.CidadeRepository;
import br.com.hummmcookies.services.exceptions.DataIntegrityException;
import br.com.hummmcookies.services.exceptions.ObjectNotFoundException;

@Service
public class CidadeService {
	@Autowired
	private CidadeRepository repo;
	@Autowired
	private EstadoService estadoService;

	public List<Cidade> findByEstado(Integer estadoId) {
		return repo.findCidades(estadoId);
	}

	public Cidade find(Integer id) {
		Optional<Cidade> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cidade.class.getName()));
	}

	public Cidade insert(Cidade obj) {
		obj.setId(null);
		obj.setEstado(estadoService.find(obj.getEstado().getId()));
		obj = repo.save(obj);
		return obj;
	}

	public Cidade update(Cidade obj) {
		Cidade newObj = find(obj.getId());
		updateData(newObj, obj);
		return repo.save(newObj);
	}

	public void updateData(Cidade newObj, Cidade obj) {
		newObj.setNome(obj.getNome());
	}

	public void delete(Integer id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma cidade que possui estados!!!");
		}
	}

	public List<Cidade> findAll() {
		return repo.findAll();
	}

	public Page<Cidade> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}

	public Cidade fromDTO(CidadeDTO objDto) {
		return new Cidade(objDto.getId(), objDto.getNome());
	}
}
	