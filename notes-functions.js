//Read existing notes from localstorage
const getSavedNotes = function(){    
    const notesJSON = localStorage.getItem('notes')
    if (notesJSON !== null){
        return JSON.parse(notesJSON)
    }
    else {
        return []
    }
}


//save notes
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })

    if (noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

//Generate the DOM structure for a note
const generateNoteDom = function(note){
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a') 
    const button = document.createElement('button')

    //setuip remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)   
    button.addEventListener('click', function(e){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //setup the note title text
        if (note.title.length > 0) {
            textEl.textContent = note.title
        }
        else {
            textEl.textContent = 'Unnamed note'
        }
    textEl.setAttribute('href', `/edit.htm#${note.id}`) 
    noteEl.appendChild(textEl)    
    return noteEl    
}

//Render notes based on provided filters. First time render all notes as filters is empty.
//Usage of includes String method.
const renderNotes = function(notes, filters){
    const filteredNotes = notes.filter(function(note, index){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    //  console.log(filteredNotes)
    // Render above filetered array on page. Clear DIV #notes content before rendering to avoid duplicate rendering.
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        const noteEl = generateNoteDom(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

