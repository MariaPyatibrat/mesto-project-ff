(()=>{"use strict";var e,t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"6231fe1d-051f-4195-aa77-acbceeb27b47","Content-Type":"application/json"}},r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(r).catch((function(e){return console.error("Ошибка при удалении карточки:",e),Promise.reject(e)}))};function o(e,t,r,n,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count"),l=c.querySelector(".card__delete-button");return a.src=e.link,a.alt=e.name,u.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===o._id}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){r(i,e._id)})),e.owner._id===o._id?(l.style.display="block",l.addEventListener("click",(function(){return t(c,e._id)}))):l.style.display="none",a.addEventListener("click",(function(){return n(e.link,e.name)})),c}function c(e,t){var r=e.classList.contains("card__like-button_is-active"),n="https://nomoreparties.co/v1/wff-cohort-33/cards/likes/".concat(t);fetch(n,{method:r?"DELETE":"PUT",headers:{authorization:"6231fe1d-051f-4195-aa77-acbceeb27b47","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e.closest(".card").querySelector(".card__like-count").textContent=t.likes.length,e.classList.toggle("card__like-button_is-active",!r)})).catch((function(e){console.error("Ошибка при постановке/удалении лайка:",e)}))}function a(e,t){confirm("Вы уверены, что хотите удалить эту карточку?")&&n(t).then((function(){e.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}}function l(e){e.target.classList.contains("popup")&&i(e.target)}function d(e){i(e.target.closest(".popup"))}function p(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector),o=!0;r.forEach((function(e){var r=null,n=null;"place-name"!==e.name&&"name"!==e.name||(r=/^[A-Za-zА-Яа-яЁё\- ]+$/,n="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"),"link"!==e.name?function(e,t,r,n){var o=document.querySelector("#".concat(e.name,"-error"));if(!e.value.trim())return o.textContent="Вы пропустили это поле.",o.classList.add(n.errorClass),e.classList.add(n.inputErrorClass),!1;if(e.value.trim().length<2)return o.textContent="Минимальное количество символов: 2. Длина текста сейчас: ".concat(e.value.trim().length," символов"),o.classList.add(n.errorClass),e.classList.add(n.inputErrorClass),!1;var c="place-name"===e.name?30:200;return e.value.trim().length>c?(o.textContent="Максимальная длина: ".concat(c," символов. Длина текста сейчас: ").concat(e.value.trim().length," символов"),o.classList.add(n.errorClass),e.classList.add(n.inputErrorClass),!1):t&&!t.test(e.value)?(o.textContent=r||"Некорректный ввод.",o.classList.add(n.errorClass),e.classList.add(n.inputErrorClass),!1):(o.textContent="",o.classList.remove(n.errorClass),e.classList.remove(n.inputErrorClass),!0)}(e,r,n,t)||(o=!1):function(e,t){var r=document.querySelector("#".concat(e.name,"-error"));return e.value.trim()?/^(https?:\/\/[^\s]+)$/.test(e.value)?(r.textContent="",r.classList.remove(t.errorClass),e.classList.remove(t.inputErrorClass),!0):(r.textContent="Введите адрес сайта",r.classList.add(t.errorClass),e.classList.add(t.inputErrorClass),!1):(r.textContent="Вы пропустили это поле.",r.classList.add(t.errorClass),e.classList.add(t.inputErrorClass),!1)}(e,t)||(o=!1)})),n.disabled=!o,n.classList.toggle(t.inactiveButtonClass,!o)}function f(e,t){e.querySelectorAll(t.inputSelector).forEach((function(e){var r=document.querySelector("#".concat(e.name,"-error"));r&&(r.textContent="",r.classList.remove(t.errorClass)),e.classList.remove(t.inputErrorClass)}));var r=e.querySelector(t.submitButtonSelector);r.disabled=!0,r.classList.add(t.inactiveButtonClass)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var _=document.querySelector(".places__list"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h=(document.querySelector(".profile__image"),document.querySelector(".popup_type_edit")),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_image"),C=document.querySelector(".popup_type_confirm-delete"),L=document.querySelector(".popup_type_avatar"),q=h.querySelector(".popup__form"),E=q.querySelector(".popup__input_type_name"),g=q.querySelector(".popup__input_type_description"),k=S.querySelector(".popup__form"),x=k.querySelector(".popup__input_type_card-name"),A=k.querySelector(".popup__input_type_url"),j=L.querySelector(".popup__form"),U=j.querySelector(".popup__input_type_avatar"),w=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),T=document.querySelector(".profile__image"),O=document.querySelector(".popup__image"),D=document.querySelector(".popup__caption");function B(e,t){O.src=e,O.alt=t,D.textContent=t,u(b)}function z(e,t){u(C),C.querySelector(".popup__button").onclick=function(){n(t).then((function(){e.remove(),i(C)})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}}function N(t){y.textContent=t.name,v.textContent=t.about,document.querySelector(".profile__avatar").src=t.avatar,e=t}function $(e,t){t?(e.textContent="Сохранение...",e.disabled=!0,e.classList.add("button_loading")):(e.textContent="Сохранить",e.disabled=!1,e.classList.remove("button_loading"))}Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(r),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(r)]).then((function(t){var r,n,u,i,s=(i=2,function(e){if(Array.isArray(e))return e}(u=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,s=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(u,i)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(u,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=s[0],d=s[1];N(l),r=d,n=document.createDocumentFragment(),r.forEach((function(t){var r=o(t,a,c,B,e);n.appendChild(r)})),_.appendChild(n)})).catch((function(e){console.error("Ошибка загрузки данных:",e)})),w.addEventListener("click",(function(){E.value=y.textContent,g.value=v.textContent,f(q,I),u(h)})),P.addEventListener("click",(function(){k.reset(),f(k,I),u(S)})),T.addEventListener("click",(function(){U.value="",f(j,I),u(L)})),q.addEventListener("submit",(function(e){e.preventDefault();var n,o=E.value.trim(),c=g.value.trim(),a=q.querySelector(".popup__button");$(a,!0),(n={name:o,about:c},fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify(n)}).then(r)).then((function(e){N(e),i(h)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){$(a,!1)}))})),k.addEventListener("submit",(function(n){n.preventDefault();var a=x.value.trim(),u=A.value.trim();if(a&&u){var s,l=k.querySelector(".popup__button");$(l,!0),(s={name:a,link:u},fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify(s)}).then(r).catch((function(e){return console.error("Ошибка при добавлении карточки:",e),Promise.reject(e)}))).then((function(t){var r=o(t,z,c,B,e);_.prepend(r),k.reset(),i(S)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){$(l,!1)}))}})),j.addEventListener("submit",(function(e){e.preventDefault();var n=U.value.trim();if(n){var o=j.querySelector(".popup__button");$(o,!0),function(e){return/^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/.test(e)?(console.log("Обновляем аватар с URL:",e),fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:e})}).then(r).catch((function(e){return console.error("Ошибка при обновлении аватара:",e),Promise.reject(e)}))):Promise.reject("Неверный формат URL аватара.")}(n).then((function(e){N(e),i(L)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Ошибка при обновлении аватара")})).finally((function(){$(o,!1)}))}else alert("Введите URL для аватара")})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",l)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",d)}));var I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};document.addEventListener("DOMContentLoaded",(function(){return function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("input",(function(){return p(t,e)})),p(t,e)}))}(I)}))})();