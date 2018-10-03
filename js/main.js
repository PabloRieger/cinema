
/*function irParaIndex() {
	
//	alert(filmePesquisar)
	var irPara = document.getElementById('btnVoltarIndex').value

	document.getElementById('filmesWeek').innerHTML = "buscarFilmesWeek()";

	//window.location.replace('file:///C:/Users/Administrador/Documents/FACULDADE/5%20semestre/Diogo/Trabalho/cinema/filmespesquisa.html')
}*/

function buscarFilmesWeek(){

axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=b3d1631a057dc6d5dfd7407785a59346')
  .then(function (response) {
//    console.log(response);
    var filmesWeek = response.data.results;
    var mostrarFilmeWeek= '';

    for(var i=0; i<filmesWeek.length;i++){
    	mostrarFilmeWeek += `
	<div class="col-sm-6 col-md-4">
    		<div class="thumbmail">
    		
    			
    				<img src="https://image.tmdb.org/t/p/w500${filmesWeek[i].poster_path}" class="img-thumbmail">
    				 <p class="card-text">${filmesWeek[i].title}</p>
    					<div class="btn-group">
                      		<button type="button" class="btn btn-sm btn-outline-secondary">Assistir</button>
                      		<button type="button" class="btn btn-sm btn-outline-secondary">Assistido</button>
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

function pesquisarFilme(e) {
    var filmePesquisar = document.getElementById('pesquisar').value

    var filmesSemanaContainer = document.getElementById('filmesSemana');
    filmesSemanaContainer.innerHTML = ""
    buscarFilmes(filmePesquisar);
    e.preventDefault();
}


function irParaPesquisa() {
	var filmePesquisar = document.getElementById('pesquisar').value
//	alert(filmePesquisar)
	buscarFilmes(filmePesquisar);

	//window.location.replace('file:///C:/Users/Administrador/Documents/FACULDADE/5%20semestre/Diogo/Trabalho/cinema/filmespesquisa.html')
}


