<h2>Requisitos Identificados e Não Implementados</h2>

<p>Durante o desenvolvimento, identifiquei alguns requisitos que são necessários, mas que não terei tempo de implementar:</p>

<ol>
  <li><strong>Atualização da Lista de Produtos:</strong><br>
    Ao excluir um card de produto, a lista deve ser atualizada para manter a coesão dos valores de ID.<br>
    <em>Impacto:</em> Melhoria na experiência do usuário.
  </li>
  <li><strong>Validação de Campos (CNPJ, CEP e Telefone):</strong><br>
    Os campos de CNPJ, CEP e telefone poderiam ser validados para garantir a entrada de dados corretos.<br>
    <em>Impacto:</em> Melhoria tanto na experiência do usuário quanto na integridade da base de dados.
  </li>
  <li><strong>Limpeza do <code>sessionStorage</code> Após o Envio:</strong><br>
    A <code>sessionStorage</code> deve ser limpa após o envio do formulário.<br>
    <em>Impacto:</em> Garantia de que a aplicação funcione corretamente, evitando dados residuais que possam interferir no comportamento da aplicação.
  </li>
</ol>

<h2>Execução do Projeto</h2>

<p>Para executar o projeto, utilize a extensão <strong>Live Server</strong> na IDE Visual Studio Code.</p>
