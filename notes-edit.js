const noteId = location.hash.substring(1)
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
let notes = getSavedNotes()
let note = notes.find(function(note){
    return note.id === noteId
})

if(note === undefined){
    location.assign('/index.htm')
}

titleElement.value = note.title
bodyElement.value = note.body

titleElement.addEventListener('input', function(e){
    note.title = this.value //e.target.value
    saveNotes(notes)
})

bodyElement.addEventListener('input', function(e){
    note.body = this.value //e.target.value
    saveNotes(notes)
})

removeElement.addEventListener('click', function(e){
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.htm')
})

window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find(function(note){
            return note.id === noteId
        })

        if(note === undefined){
            location.assign('/index.htm')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
    }
})
