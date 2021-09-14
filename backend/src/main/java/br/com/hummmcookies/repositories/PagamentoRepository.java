package br.com.hummmcookies.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.hummmcookies.domain.Pagamento;


@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Integer>
{
	
}
