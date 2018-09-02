// const notes =[ {title: 'My next trip',
//                 body: 'I would like to go to Spain'
//                 },
//                 {title: 'Habits to work on',
//                 body: 'Exercise, eating a bit better'
//                 },
//                 {title: 'Office modifications',
//                 body: 'Get a new seat' 
//                 }
//             ]

let notes = []

const filters = {
    searchText: ''
}            

//Check for existing saved data.
const notesJSON = localStorage.getItem('notes')
if (notesJSON !== null){
    notes = JSON.parse(notesJSON)
}

//Render notes based on provided filters. First time render all notes as filters is empty.
//Usage of includes String method.
const renderNotes = function(notes, filters){
    const filteredNotes = notes.filter(function(note, index){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
     console.log(filteredNotes)
    // Render above filetered array on page. Clear DIV #notes content before rendering to avoid duplicate rendering.
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        const noteEl = document.createElement('p')

        if (note.title.length > 0) {
            noteEl.textContent = note.title
        }
        else {
            noteEl.textContent = 'Unnamed note'
        }

        
        document.querySelector('#notes').appendChild(noteEl)
    })
}

// Call first time for showing all filters on page.
renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click',function(e){
    // console.log('The button was clicked')
    notes.push({
        title: '',
        body: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes, filters)
})

document.querySelector('#search-text').addEventListener('input', function(e){
    // console.log(this.value)
    filters.searchText = this.value //this is equal to e.target.value
    renderNotes(notes, filters)
})



// document.querySelector('#remove-all').addEventListener('click',function(e){
//     console.log('Delete all notes')
//     document.querySelectorAll('.note').forEach(function(note){
//         note.remove()
//     })
// })






// const ps = document.querySelectorAll('p')

// ps.forEach(function(p){
//     p.textContent = '**************'
// })

// // Add a new element

// const newParagraph = document.createElement('p')
// newParagraph.textContent = 'This is a new element from Javascript!'
// document.querySelector('body').appendChild(newParagraph)