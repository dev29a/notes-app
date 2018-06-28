const notes = [ {title:'My next trip', 
                body:'I would like to go to Spain'
            },
                {title:'Habits to work on',
                body:'Exercise, Eating a bit better'
            },
                {title:'Office modification',
                body:'Get a new seat'
            }]

const filters = {
    searchText:''
}            

function renderNotes(notes, filters){
    const filteredNotes = notes.filter(function(note, index){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    ///console.log(filteredNotes)

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        const noteEl = document.createElement('p')
        noteEl.textContent = note.title
        document.querySelector('#notes').appendChild(noteEl)
    })

}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function(e){
    this.textContent = 'The button was clicked'
})

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = this.value
    renderNotes(notes, filters)
})

document.querySelector('#name-form').addEventListener('submit', function(e){
    e.preventDefault()
    console.log(this.elements.firstName.value)
})










