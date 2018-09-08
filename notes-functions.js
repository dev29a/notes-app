//Read existing notes from localstorage
const getSavedNotes = () => {    
    const notesJSON = localStorage.getItem('notes')
    if (notesJSON !== null){
        return JSON.parse(notesJSON)
    }
    else {
        return []
    }
}


//save notes to localstorage
const saveNotes = (notes) => { 
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id )

    if (noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

//Generate the DOM structure for a note
const generateNoteDom = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a') 
    const button = document.createElement('button')

    //setuip remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)   
    button.addEventListener('click', (e) => {
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

//sort notes by filters
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else {
                return 0
            }
        })
    }else if (sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else {
                return 0
            }
        })
    }else if (sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else {
                return 0
            }
        })
    }
}

//Render notes based on provided filters. First time render all notes as filters is empty.
//Usage of includes String method.
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note, index) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    //  console.log(filteredNotes)
    // Render above filetered array on page. Clear DIV #notes content before rendering to avoid duplicate rendering.
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteEl = generateNoteDom(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

//generate the last edited function
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`