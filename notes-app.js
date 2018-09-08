let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}            

// Call first time for showing all filters on page.
renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click',function(e){
    // console.log('The button was clicked')
    const id = uuidv4()
    const timeStamp = moment.valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    saveNotes(notes)
    // renderNotes(notes, filters)
    location.assign(`/edit.htm#${id}`)
})

document.querySelector('#search-text').addEventListener('input', function(e){
    // console.log(this.value)
    filters.searchText = this.value //this is equal to e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

