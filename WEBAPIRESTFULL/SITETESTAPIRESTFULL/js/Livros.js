var generosList;
var editorasList;

jQuery(document).ready(function () {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://localhost:59271/Api/Livros/" + id,
		"method": "GET",
		"headers": {
			"Content-Type": "application/json",
			"Accept": "*/*"
		}
	}

	$.ajax(settings).done(function (response) {
		generosList = response;

		$.each(response, function(index, value){
			$('#Genero')[0].innerHTML += '<option value\''+ value.id +'\'>'+ value.Tipo +'</optic'
		});
	});

});
	
	function Deleting(id) {
		var settings = {
			"crossDomain": true,
			"url": "http://localhost:59271/Api/Livros/" + id,
			"method": "DELETE",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*"
			}
		}

		$.ajax(settings).done(function (response) {
			GetMethod(null);
		});
	}
    
    function GetMethod(object) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://localhost:59271/Api/Livros",
			"method": "GET",
			"headers": {
				"Content-Type": "application/json",
				"Accept": "*/*"
			}
		}

		$.ajax(settings).done(function (response) {
			RefrestGrid(response);
		});

		return false;
	}

	function translateField(filedValue, listTransLate, toValue){
		var retorno;

		$.each(listTransLate, function(index, value){
			if(value.Id == filedValue)
			retorno = value[toValue];
		});

		return retorno;
	}
   
    function RefrestGrid(contentValue) {
		$('#tDataGrid').empty();
		$('#tDataGrid').html('<tbody>'
			+ '<tr>'
			+ '<th>ID</th>'
			+ '<th>Titulo</th>'
			+ '<th>Registro</th>'
			+ '<th>ISBN</th>'
			+ '<th>Ativo</th>'
			+ '<th>Genero</th>'
			+ '<th>Editora</th>'
			+ '<th>Sinopse</th>'
			+ '<th>Observacao</th>'
			+ '<th>Opções</th>'
			+ '</tr>'
			+ '</tbody>');

		$.each(contentValue, function (index, value) {
			var row = '<tr>'
				+ '<td>' + value.Id + '</td>'
				+ '<td>' + value.Titulo + '</td>'
				+ '<td>' + value.Registro + '</td>'
				+ '<td>' + value.ISBN + '</td>'
				+ '<td>' + translateField(value.Editora, editorasList, 'Nome') + '</td>'
				+ '<td>' + translateField(value.Genero, generosList, 'Tipo') + '</td>'
				+ '<td>' + value.Editora + '</td>'
				+ '<td>' + value.Sinopse + '</td>'
				+ '<td>' + value.Obsevacao + '</td>'
				+ '<td>'
				+ '<div    class=\'col-md-12\' style=\'float: right;\'>'
				+ '<div    class=\'col-md-6\'>'
				+ '<button class=\'btn btn-block btn-danger col-md-3 ajax\' type=\'button\'  onclick=\'Deleting(' + value.Id + ')\'>Remover</button>'
				+ '</div>'
				+ '<div     class=\'col-md-6\'>'
				+ '<button  class=\'btn btn-block btn-success col-md-3\'    type=\'button\'  onclick=\'GetByID(' + value.Id + ')\'\>Editar</button>'
				+ '</div>'
				+ '</div>'
				+ '</td>'
				+ '</tr>';
			$('#tDataGrid').append(row);
		});
	}