
var filmesWeek = '';
var mostrarFilmeWeek= '';

function buscarFilmesWeek(){

axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=b3d1631a057dc6d5dfd7407785a59346')
  .then(function (response) {
//    console.log(response);
    filmesWeek = response.data.results;
   

    for(var i=0; i<filmesWeek.length;i++){
    	mostrarFilmeWeek += `
	<div class="col-sm-6 col-md-4">
    		<div class="thumbmail">
    		
    			
    				<img src="https://image.tmdb.org/t/p/w500${filmesWeek[i].poster_path}" class="img-thumbmail">
					
    				 <p class="card-text">${filmesWeek[i].title}</p>
    					<div class="btn-group">
                      		 <button onclick="AdicionarFilmesWeek(${i}, ${filmesWeek[i].id})" type="submit" class="btn btn-sm btn-primary">Assistir</button>
							 <button onclick="ExcluirFilmesWeek(${i}, ${filmesWeek[i].id})" type="submit" class="btn btn-sm btn-success">Assistido</button>
                    	</div>
              

    		</div>
    	</div>
         `;
    }
 document.getElementById('filmesWeek').innerHTML = mostrarFilmeWeek;

  })
  .catch(function (error) {
    console.log(error);
  });

 }
 //chamada do metodo para carregar assim que a pagina for aberta
buscarFilmesWeek();

document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

ListarFilmesWeek();

function AdicionarFilmesWeek(i, id)
{
  var codigo = filmesWeek[i].id
  var titulo = filmesWeek[i].title
  var tituloOriginal = filmesWeek[i].original_title
  var indice_selecionado = -1;

  var storageLocal = localStorage.getItem("storageLocal"); // Recupera os dados armazenados

  storageLocal = JSON.parse(storageLocal); // Converte string para objeto

  if (storageLocal == null) // Caso não haja conteúdo, iniciaremos um vetor vazio para popular
    storageLocal = [];

  var filme = GetFilme("Codigo", codigo);

    if (filme != null) {
      alert("Filme já cadastrado.");
      return;
    }

    var filme = JSON.stringify({
      Codigo   : codigo,
      Titulo   : titulo,
      OriginalTitulo    : tituloOriginal

    });

    storageLocal.push(filme);

    localStorage.setItem("storageLocal", JSON.stringify(storageLocal));

    alert("Filme adicionado.");
    return true;

  function GetFilme(propriedade, valor)
  {
    var filme = null;
        for (var item in storageLocal) {
            var i = JSON.parse(storageLocal[item]);
            if (i[propriedade] == valor)
                filme = i;
        }
        return filme;
  }
}

function ListarFilmesWeek()
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
                    "   <td>"+filme.Codigo+"</td>" +
                    "   <td>"+filme.Titulo+"</td>" +
                    "   <td>"+filme.OriginalTitulo+"</td>" +
					"	<td> <button type='button' class='btn btn-danger' onclick='ExcluirFilmesWeek(${i}, ${filmesWeek[i].id})'>"+
					"   <img src='https://png.icons8.com/metro/18/ffffff/cancel.png' class='btnExcluirFilmesWeek'>"+
					"	</button>"+
					"	</td>"+
                    
					"</tr>");
     }
}
function ExcluirFilmesWeek(i, id)
{
  var codigo = filmesWeek[i].id
  var storageLocalE = localStorage.getItem("storageLocal");
  storageLocalE = JSON.parse(storageLocalE);
  
  if (storageLocalE == null) {
      alert ("LocalStorage vazio");
      return true;
  }
 
  var filme = BuscaFilme("Codigo", codigo);
  var indice_selecionado = eliminar

  if (filme == null) {
    alert("Filme não Favoritado.");
    return true;
  } else {
    
      storageLocalE.splice(indice_selecionado, 1);
      localStorage.setItem("storageLocal", JSON.stringify(storageLocalE));
      alert("Filme removido!");
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

function pesquisarFilme(q)
{
    var filmePesquisar = document.getElementById('pesquisar').value

    var filmesSemanaContainer = document.getElementById('filmesSemana');
    filmesSemanaContainer.innerHTML = ""
    buscarFilmes(filmePesquisar);
    q.preventDefault();
}


function irParaPesquisa()
{
  var filmePesquisar = document.getElementById('pesquisar').value
  buscarFilmes(filmePesquisar);

}
