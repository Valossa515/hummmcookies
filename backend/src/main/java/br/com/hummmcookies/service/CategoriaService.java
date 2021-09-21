package br.com.hummmcookies.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.hummmcookies.domain.Categoria;
import br.com.hummmcookies.dto.CategoriaDTO;
import br.com.hummmcookies.repositories.CategoriaRepository;
import br.com.hummmcookies.services.exceptions.DataIntegrityException;
import br.com.hummmcookies.services.exceptions.ObjectNotFoundException;


@Service
public class CategoriaService 
{
	@Autowired
	private CategoriaRepository repo;
	
	public Categoria find(Integer id) {
		Optional<Categoria> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Categoria.class.getName()));
	}
	public List<CategoriaDTO> find2(){
		List<Categoria> result = findAll();
		return result.stream().map(x -> new CategoriaDTO(x)).collect(Collectors.toList());
	}
	public Categoria insert(Categoria obj)
	{
		obj.setId(null);
		return repo.save(obj);
	}
	
	public Categoria update(Categoria obj) 
	{
		Categoria newObj = find(obj.getId());
		updateData(newObj, obj);
		return repo.save(newObj);
	}
	public void delete(Integer id) 
	{
		find(id);
		try
		{
			repo.deleteById(id);
		}
		catch(DataIntegrityViolationException e)
		{
			throw new DataIntegrityException("Não é possível excluir uma categoria que possui produtos!!!");
		}
	}
	public List<Categoria> findAll() 
	{
		return repo.findAll();
	}
	
	
	public Page<Categoria> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}
	
	public Categoria fromDTO(CategoriaDTO objDto)
	{
		return new Categoria(objDto.getId(), objDto.getNome());
	}
	public void updateData(Categoria newObj, Categoria obj)
	{
		newObj.setNome(obj.getNome());
	}
}
