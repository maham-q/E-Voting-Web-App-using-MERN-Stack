/* eslint-disable*/

export const hideAlert = () => {
    const doc = document.querySelector('.alert');
    if(doc) doc.parentElement.removeChild(doc);
}


//Type is 'succes' or 'error
export const showAlert = (type , message) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}" >${message}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin' , markup);
    window.setTimeout(hideAlert , 5000);
}