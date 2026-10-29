const draggableElement = document.querySelectorAll('.box');
const droppableElement = document.querySelectorAll('.droppable');



draggableElement.forEach(element=>{
    element.addEventListener('dragstart',(drgStart)=>{
        drgStart.dataTransfer.setData('text',drgStart.target.id);
        console.log('dragstart event is activated!');
        drgStart.currentTarget.classList.add('draggableFormat')
        console.log('dragstart!');

    });

});

droppableElement.forEach(element=>{
    element.addEventListener('drop',drpEvt=>{
        drpEvt.preventDefault();
        const droppedElementId = drpEvt.dataTransfer.getData('text');
        const dropZoneId = drpEvt.target.getAttribute('data-draggable-id');

        drpEvt.target.appendChild(document.getElementById(droppedElementId));

        console.log(droppedElementId);



    });

    element.addEventListener('dragover',(drgOverEvt)=>{
        drgOverEvt.preventDefault();
    });

});

draggableElement.forEach(element=>{
    element.addEventListener('dragend',drgend=>{
       



    });

});
drgstart.target.id
drgstart.target.id
drgstart.target.id
drgstart.target.id
