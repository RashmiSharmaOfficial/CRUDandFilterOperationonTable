let students = []
var selectedRow = null

function onFormSubmit(){

    var formData = readFormData()
    if(selectedRow === null){
        insertNewRecord(formData)
    }
    else{
        updateRecord(formData)
    }
    resetForm();
}

//retreive the data
function readFormData(){
     var formData = {}
     formData['studId'] = document.getElementById('studId').value

     formData['studName'] = document.getElementById('studName').value

     formData['studMarks'] = document.getElementById('studMarks').value

     console.log(typeof(formData))
     //add object to array
     students.push(formData);
     console.log(students)
     return students;
}


function insertNewRecord(data){
    var table = document.getElementById('myTable')

    // for(var i = 0; i < data.length; i++){
        var row = `<tr>
							<td>${data[data.length-1].studId}</td>
							<td>${data[data.length-1].studName}</td>
							<td>${data[data.length-1].studMarks}</td>
                            <td><button class="btn" onClick = "onEdit(this)"><i class="fas fa-user-edit" style="marginRight:10px"></i></button>

                            <button class="btn" onClick = "onDelete(this)"><i class="fas fa-trash-alt"></i></button></td>

					  </tr>`
			table.innerHTML += row
    // }

}


function resetForm() {
    document.getElementById('studId').value = ""
    document.getElementById('studName').value = ""
    document.getElementById('studMarks').value = ""
    selectedRow = null
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;

    document.getElementById('studId').value = selectedRow.cells[0].innerHTML

    document.getElementById('studName').value = selectedRow.cells[1].innerHTML

    document.getElementById('studMarks').value = selectedRow.cells[2].innerHTML

}

function updateRecord(data){
    console.log(selectedRow.rowIndex)
    students.splice(selectedRow.rowIndex-1, 1)
    
    selectedRow.cells[0].innerHTML = data[data.length-1].studId
    selectedRow.cells[1].innerHTML = data[data.length-1].studName
    selectedRow.cells[2].innerHTML = data[data.length-1].studMarks

}


//------------ delete function ----------------
function onDelete(td){
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        // console.log(row.rowIndex)
        document.getElementById("storeList").deleteRow(row.rowIndex);
        students.splice(row.rowIndex)
        resetForm();
    }
}



// ======== search function starts here =======
const searchFunc = () => {
    let filter = document.getElementById("studSearch").value.toUpperCase();
    console.log(filter)

    let myTable = document.getElementById("storeList")

    let tr = myTable.getElementsByTagName('tr')
     
    for (var i = 0; i < tr.length; i++){
        let td = tr[i].getElementsByTagName('td')[1]
        
        if(td){
            let textValue = td.textContent || td.innerHTML

            if(textValue.toUpperCase().startsWith(filter)){
                tr[i].style.display = "table-row";
            }else{
                tr[i].style.display = "none"
            }
        }
    }

}

//--------------- sorting -----------
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});
