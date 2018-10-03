
function buscarFilmes(filmePesquisar){

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=b3d1631a057dc6d5dfd7407785a59346&language=en-US&query=' + filmePesquisar)
   .then(function (response) {
    console.log(response);
    var filmes = response.data.results;
    var mostrarFilme= '';

     for(var i=0; i<filmes.length;i++){
       /* mostrarFilme += `

        <div class="col-sm-6 col-md-4">

            <div class="thumbmail">
                <img src="https://image.tmdb.org/t/p/w500${filmes[i].poster_path}" class="img-thumbmail">
                <h4>${filmes[i].vote_average}</h4>
                <h4>${filmes[i].title}</h4>
               <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Assistir</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Assistido</button>
                        </div>
            </div>
        </div>

        `;*/


teste.teste
       mostrarFilme += ` 
    <div class="col-sm-6 col-md-4">
            <div class="thumbmail">
            
                
                    <img src="https://image.tmdb.org/t/p/w500${filmes[i].poster_path}" class="img-thumbmail">
                     <p class="card-text">${filmes[i].title}</p>
                     <h4>${filmes[i].vote_average}</h4>
                       <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Assistir</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Assistido</button>
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