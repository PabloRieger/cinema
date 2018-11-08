var filmes = '';
function buscarFilmes(filmePesquisar){

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=b3d1631a057dc6d5dfd7407785a59346&language=en-US&query=' + filmePesquisar)
   .then(function (response) {
    //console.log(response.data);
    filmes = response.data.results;
    var mostrarFilme= '';

     for(var i=0; i<filmes.length;i++){
     
mostrarFilme += ` 
   <div class="col-sm-6 col-md-4">
    		<div class="thumbmail">
    		
    			
    				<img src="https://image.tmdb.org/t/p/w500${filmes[i].poster_path}" class="img-thumbmail">
					
    				 <p class="card-text">${filmes[i].title}</p>
    					<div class="btn-group">
                      		 <button onclick="SalvarFilmesPesquisados(${i}, ${filmes[i].id})" type="submit" class="btn btn-sm btn-primary">Assistir</button>
							 <button onclick="ApagarFilmesPesquisados(${i}, ${filmes[i].id})" type="submit" class="btn btn-sm btn-success">Assistido</button>
                    	</div>
              

    		</div>
    	</div>
         `;

    }
   document.getElementById('filmes').innerHTML = mostrarFilme;

  })
  .catch(function (error) {
   console.log(error);
  });
}

buscarFilmes();

ListarE();
function SalvarFilmesPesquisados(i, id){
  var codigo = filmes[i].id;
  var titulo = filmes[i].title
  var origtitulo = filmes[i].original_title

  var storageLocal = localStorage.getItem("storageLocal"); // Recupera os dados armazenados

  storageLocal = JSON.parse(storageLocal); // Converte string para objeto

  if (storageLocal == null) // Caso não haja conteúdo, iniciaremos um vetor vazio para popular
    storageLocal = [];

  var filme = GetFilme("Codigo", codigo);

    if (filme != null){
      alert("Filme já cadastrado na lista de Favoritos.");
      return;
    }

    var filme = JSON.stringify({
      Codigo   : codigo,
      Titulo   : titulo,
      OriginalTitulo    : origtitulo

    });

    storageLocal.push(filme);

    localStorage.setItem("storageLocal", JSON.stringify(storageLocal));

    alert("Filme adicionado.");
    return true;

    function GetFilme(propriedade, valor){
    var filme = null;
        for (var item in storageLocal) {
            var i = JSON.parse(storageLocal[item]);
            if (i[propriedade] == valor)
                filme = i;
        }
        return filme;
  }
}

function ListarE()
{
    var storageLocal = localStorage.getItem("storageLocal");
    storageLocal = JSON.parse(storageLocal);
    $("#listaFavorito").html("");
    $("#listaFavorito").html(
       "<thead>"+
              "<tr>"+
                "<th >#</th>"+
                "<th >Filme</th>"+
                "<th >Diretor</th>"+
				"<th >Retirar da Lista</th>"+
                "</tr>"+
            "</thead>"+ 
      "<tbody>"+
      "</tbody>"
      );

     for (var i in storageLocal) {
      var filme = JSON.parse(storageLocal[i]);
       $("#listaFavorito tbody").append("<tr>" +
                    "   <td>"+filme.Codigo+"<span class='codigo' style='display: none;'>"+filme.Codigo+"</span></td>" +
                    "   <td>"+filme.Titulo+"</td>" +
                    "   <td>"+filme.OriginalTitulo+"</td>" +
					"	<td> <button type='button' class='btn btn-danger btnExcluir' > "+
					"   <img src='https://png.icons8.com/metro/18/ffffff/cancel.png'>"+
					"	</button>"+
					"	</td>"+ "</tr>");
				
     }

}
function ApagarFilmesPesquisados(i, id)
{
  var codigo = filmes[i].id
  var storageLocalE = localStorage.getItem("storageLocal");
  storageLocalE = JSON.parse(storageLocalE);
  
  if (storageLocalE == null) {
      alert ("LocalStorage vazio");
      return;
  }
 
  var filme = BuscaFilme("Codigo", codigo);
  var indice_selecionado = eliminar

  if (filme == null) {
    alert("Filme não Favoritado.");
    return;
  } else {
      //alert ("Codigo: " + codigo);
      storageLocalE.splice(indice_selecionado, 1);
      localStorage.setItem("storageLocal", JSON.stringify(storageLocalE));
      alert("Filme removido.");
      return true;
      }
  
    function BuscaFilme(propriedade, valor)
    {
      var filme = null;
        for (var item in storageLocalE) {
          var i = JSON.parse(storageLocalE[item]);
          if (i[propriedade] == valor){
            filme = i;
            eliminar = item;
            //debugger;
          }
        }
        return filme, eliminar;
        }
}

$('.btnExcluir').click(function(){
  var filmesAtuais = JSON.parse(localStorage.getItem('storageLocal'));
  var codigoApagarFilmesPesquisados = $(this).parents('tr').find('.codigo').text();
  var filmesNovos = filmesAtuais.filter(function(item){
    var jsonAqui = JSON.parse(item);
    return jsonAqui.Codigo != parseInt(codigoApagarFilmesPesquisados);
  });
  $(this).parents('tr').remove();
  var jsonSalvarFilmesPesquisados = JSON.stringify(filmesNovos);
  localStorage.setItem('storageLocal', jsonSalvarFilmesPesquisados);
});