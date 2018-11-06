
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
    				 <p class="card-text">${filmesWeek[i].title} id="title"</p>
    					<div class="btn-group">
                      		<button type="button" class="btn btn-sm btn-outline-secondary" id="btnAssistitrFilmesWeek" onclick="btnAssistitrFilmesWeek()">Assistir</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAssistidoFilmesWeek" onclick="btnAssistidoFilmesWeek()">Assistido</button>
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

function btnAssistitrFilmesWeek(){

	var btnPress = document.getElementById('btnAssistitrFilmesWeek');
	alert("funfou")
	assistirFilmes(btnPress);
} 

function assistirFilmes(){

    var mostrarFilmeWeek= '';

    for(var i=0; i<filmesassistidos.length;i++){
    	mostrarFilmeWeek += `
	<tr>
                <th scope="row"></th>
                <td>The Social Network (2010)</td>
                <td>David Fincher</td>
                <td><img class="mr-sm-2" src="https://png.icons8.com/material-rounded/18/f1c40f/christmas-star.png">8.8/10</td>
                <td>
                  <button type="button "class="btn btn-danger"><img src="https://png.icons8.com/metro/18/ffffff/cancel.png"></button>
                </td>
    </tr>
         `;
    }
    document.getElementById('assistirfilmes').innerHTML = mostrarFilmeWeek;
}

 //chamada do metodo para carregar assim que a pagina for aberta
 assistirFilmes();	









