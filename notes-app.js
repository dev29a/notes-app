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

const notes = getSavedNotes()

const filters = {
    searchText: ''
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