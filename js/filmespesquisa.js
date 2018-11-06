
function buscarFilmes(filmePesquisar){

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=b3d1631a057dc6d5dfd7407785a59346&language=en-US&query=' + filmePesquisar)
   .then(function (response) {
    //console.log(response.data);
    var filmes = response.data.results;
    var mostrarFilme= '';

     for(var i=0; i<filmes.length;i++){
     
mostrarFilme += ` 
   <div class="col-sm-6 col-md-4">
    		<div class="thumbmail">
    		
    			
    				<img src="https://image.tmdb.org/t/p/w500${filmes[i].poster_path}" class="img-thumbmail">
					
    				 <p class="card-text">${filmes[i].title}</p>
    					<div class="btn-group">
                      		 <button onclick="Salvar(${i}, ${filmes[i].id})" type="submit" class="btn btn-sm btn-primary">Assistir</button>
							 <button onclick="Apagar(${i}, ${filmes[i].id})" type="submit" class="btn btn-sm btn-success">Assistido</button>
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

buscarFilmes()

//document.getElementById('formulario').addEventListener('submit');

//Listar();

function Adicionar(i, id)
{
  var codigo = filmes[i].id
  var titulo = filmes[i].title
  var origtitulo = filmes[i].original_title
  var indice_selecionado = -1;

  var tbFilmes = localStorage.getItem("tbFilmes"); // Recupera os dados armazenados

  tbFilmes = JSON.parse(tbFilmes); // Converte string para objeto

  if (tbFilmes == null) // Caso não haja conteúdo, iniciaremos um vetor vazio para popular
    tbFilmes = [];

  var filme = GetFilme("Codigo", codigo);

    if (filme != null) {
      alert("Filme já cadastrado.");
      return;
    }

    var filme = JSON.stringify({
      Codigo   : codigo,
      Titulo   : titulo,
      OriginalTitulo    : origtitulo

    });

    tbFilmes.push(filme);

    localStorage.setItem("tbFilmes", JSON.stringify(tbFilmes));

    alert("Filme adicionado.");
    return true;

  function GetFilme(propriedade, valor)
  {
    var filme = null;
        for (var item in tbFilmes) {
            var i = JSON.parse(tbFilmes[item]);
            if (i[propriedade] == valor)
                filme = i;
        }
        return filme;
  }
}

function ListarE()
{
    var tbFilmes = localStorage.getItem("tbFilmes");
    tbFilmes = JSON.parse(tbFilmes);
    $("#listaFavorito").html("");
    $("#listaFavorito").html(
       "<thead>"+
              "<tr>"+
                "<th >#</th>"+
                "<th >Filme</th>"+
                "<th >Diretor</th>"+
                "</tr>"+
            "</thead>"+ 
      "<tbody>"+
      "</tbody>"
      );

     for (var i in tbFilmes) {
      var filme = JSON.parse(tbFilmes[i]);
        $("#listaFavorito tbody").append("<tr>" +
                    "   <td>"+filme.Codigo+"</td>" +
                    "   <td>"+filme.Titulo+"</td>" +
                    "   <td>"+filme.OriginalTitulo+"</td>" +
                    "</tr>");
     }
}

function Excluir(i, id)
{
  var codigo = filmes[i].id
  var tbFilmesE = localStorage.getItem("tbFilmes");
  tbFilmesE = JSON.parse(tbFilmesE);
  
  if (tbFilmesE == null) {
      alert ("LocalStorage vazio");
      return;
  }
 
  var filme = BuscaFilme("Codigo", codigo);
  var indice_selecionado = eliminar

  if (filme = null) {
    alert("Filme não Favoritado.");
    return;
  } else {
      //alert ("Codigo: " + codigo);
      tbFilmesE.splice(indice_selecionado, 1);
      localStorage.setItem("tbFilmes", JSON.stringify(tbFilmesE));
      alert("Filme  " + codigo + "  Assistido. Removido do LocalStorage.");
      return true;
      }
  
    function BuscaFilme(propriedade, valor)
    {
      var filme = null;
        for (var item in tbFilmesE) {
          var i = JSON.parse(tbFilmesE[item]);
          if (i[propriedade] == valor){
            filme = i;
            eliminar = item;
            //debugger;
          }
        }
        return filme, eliminar;
        }
}

function pesquisarFilme(q)
{
    var filmePesquisar = document.getElementById('pesquisar').value

    var filmesSemanaContainer = document.getElementById('filmesdaSemana');
    filmesSemanaContainer.innerHTML = ""
    buscarFilmes(filmePesquisar);
    q.preventDefault();
}


function irParaPesquisa()
{
  var filmePesquisar = document.getElementById('pesquisar').value
  buscarFilmes(filmePesquisar);

}
