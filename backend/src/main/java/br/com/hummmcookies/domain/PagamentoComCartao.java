package br.com.hummmcookies.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonTypeName;

import br.com.hummmcookies.enums.EstadoPagamento;

@Entity
@JsonTypeName("pagamentoComCartao")
@Table(name = "tb_pagtocartao")
public class PagamentoComCartao extends Pagamento{
	private static final long serialVersionUID = 1L;
	private Integer numeroDeParcelas;
	
	public PagamentoComCartao()
	{
		
	}

	public PagamentoComCartao(Integer id, EstadoPagamento estado, Pedido pedido, Integer numeroDeParcelas) {
		super(id, estado, pedido);
		this.numeroDeParcelas = numeroDeParcelas;
	}

	public Integer getNumeroDeParcelas() {
		return numeroDeParcelas;
	}

	public void setNumeroDeParcelas(Integer numeroDeParcelas) {
		this.numeroDeParcelas = numeroDeParcelas;
	}
	
	
}
