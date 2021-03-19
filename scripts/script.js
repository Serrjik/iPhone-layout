document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// Функция получает товары с сервера.
	const getData = (url, callback) => {
		const request = new XMLHttpRequest()
		request.open('GET', url)
		request.send()

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return
			}

			if (request.status === 200) {
				const response = JSON.parse(request.response)
				callback(response);
			}

			else {
				console.error(new Error('Ошибка: ' + request.status))
			}
		})
	}

	// Функция для работы табов.
	const tabs = () => {
		// Кнопки переключения табов.
		const cardDetailChangeElems = document
			.querySelectorAll('.card-detail__change')
		// Заголовок выбранного таба.
		const cardDetailsTitleElem = document
			.querySelector('.card-details__title')
		// Картинка товара выбранного таба.
		const cardImageItemElem = document.querySelector('.card__image_item')
		// Цена товара выбранного таба.
		const cardDetailsPriceElem = document
			.querySelector('.card-details__price')
		// Встроенная память (ROM) товара в выбранном табе.
		const descriptionMemoryElem = document
			.querySelector('.description__memory')

		// Данные всех телефонов, которые есть в наличии.
		const data = [
			{
				name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
				img: './img/iPhone-graphite.png',
				price: 95990,
				memoryROM: 128,
			},
			{
				name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
				img: './img/iPhone-silver.png',
				price: 120000,
				memoryROM: 256,
			},
			{
				name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
				img: './img/iPhone-blue.png',
				price: 99990,
				memoryROM: 128,
			},
		]

		// Функция убирает выделение со всех кнопок переключения табов.
		const deactive = () => {
			// Пройти по всем кнопкам переключения табов.
			// Убрать выделение с выбранной кнопки переключения таба.
			cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
		}

		// Пройти по всем кнопкам переключения табов.
		cardDetailChangeElems.forEach((btn, i) => {
			btn.addEventListener('click', () => {
				// Если кнопка переключения таба НЕ активная:
				if (!btn.classList.contains('active')) {
					deactive()
					// Выделить кнопку переключения таба.
					btn.classList.add('active')

					// Изменить содержимое элементов таба.
					cardDetailsTitleElem.textContent = data[i].name
					cardImageItemElem.src = data[i].img
					cardImageItemElem.alt = data[i].name
					cardDetailsPriceElem.textContent = `${data[i].price}₽`
					descriptionMemoryElem.textContent =
						`Встроенная память (ROM) ${data[i].memoryROM} ГБ`
				}
			})
		})
	}

	// Функция для работы аккордеона.
	const accordion = () => {
		// Блок с аккордеоном.
		const characteristicsListElem = document
			.querySelector('.characteristics__list')
		// Все элементы аккордеона.
		const characteristicsItemElems = characteristicsListElem
			.querySelectorAll('.characteristics__item')

		/*
			Определение высоты блока с описанием части товара
			активного элемента аккордеона.
		*/
		// Пройти по всем элементам аккордеона.
		characteristicsItemElems.forEach(elem => {
			if (elem.children[1].classList.contains('active')) {
				elem.children[1].style
					.height = `${elem.children[1].scrollHeight}px`
			}
		})

		/*
			Функция открывает пункт аккордеона. Принимает кнопку, на которую
			нажали, и блок с характеристиками, которые нужно отобразить.
		*/
		const open = (button, dropDown) => {
			// Закрыть все элементы аккордеона, кроме активного.
			closeAllDrops(button, dropDown)

			dropDown.style.height = `${dropDown.scrollHeight}px`
			button.classList.add('active')
			dropDown.classList.add('active')
		}

		/*
			Функция закрывает пункт аккордеона. Принимает кнопку, на которую
			нажали, и блок с характеристиками, которые нужно скрыть.
		*/
		const close = (button, dropDown) => {
			button.classList.remove('active')
			dropDown.classList.remove('active')
			dropDown.style.height = '0'
		}

		// Функция закрывает все элементы аккордеона, кроме принятых.
		const closeAllDrops = (button, dropDown) => {
			// Пройти по всем элементам аккордеона.
			characteristicsItemElems.forEach(elem => {
				if (elem.children[0] !== button &&
				elem.children[1] !== dropDown) {
					close(elem.children[0], elem.children[1])
				}
			})
		}

		characteristicsListElem.addEventListener('click', event => {
			const target = event.target

			// Если кликнули по кнопке-заголовку аккордеона:
			if (target.classList.contains('characteristics__title')) {

				const parent = target.closest('.characteristics__item')
				const description = parent
					.querySelector('.characteristics__description')

				// Если элемент аккордеона развёрнут:
				if (description.classList.contains('active')) {
					// Свернуть элемент аккордеона.
					close(target, description)
				}

				// Если элемент аккордеона свёрнут:
				else {
					// Развернуть элемент аккордеона.
					open(target, description)
				}
			}
		})

		// Обработчик клика по странице вне аккордеона.
		document.body.addEventListener('click', event => {
			const target = event.target
			// Если кликнули вне аккордеона:
			if (!target.closest('.characteristics__list')) {
				// Закрыть все элементы аккордеона.
				closeAllDrops()
			}
		})

		/* ----------------------------------------------------------------- */
		// Код работы аккордеона без делегирования.
		// // Кнопка раскрытия/закрытия характеристик части товара.
		// const characteristicsTitle = document
		// 	.querySelectorAll('.characteristics__title')
		// // Блок с характеристиками части товара.
		// const characteristicsDescription = document
		// 	.querySelectorAll('.characteristics__description')

		// // Пройти по всем кнопкам раскрытия/закрытия характеристик части товара.
		// characteristicsTitle.forEach((elem, i) => {
		// 	elem.addEventListener('click', () => {
		// 		/*
		// 			Изменить вид кнопки раскрытия/закрытия характеристик части
		// 			товара "раскрытая/закрытая".
		// 		*/
		// 		elem.classList.toggle('active')
		// 		// Скрыть/отобразить блок с характеристиками части товара.
		// 		characteristicsDescription[i].classList.toggle('active')
		// 	})
		// })
	}

	// Функция работы модального окна.
	const modal = () => {
		// Кнопка "Купить".
		const cardDetailsButtonBuy = document
			.querySelector('.card-details__button_buy')
		// Кнопка "Купить с доставкой".
		const cardDetailsButtonDelivery = document
			.querySelector('.card-details__button_delivery')
		// Контейнер для дополнительных товаров.
		const crossSellList = document.querySelector('.cross-sell__list')

		// Модальное окно.
		const modal = document.querySelector('.modal')
		// Заголовок таба.
		const cardDetailsTitle = document.querySelector('.card-details__title')
		// Заголовок товара в модальном окне.
		const modalTitle = modal.querySelector('.modal__title')
		// Заголовок модального окна (для чего окно).
		const modalSubtitle = modal.querySelector('.modal__subtitle')
		// Скрытый инпут формы в модальном окне с названием товара.
		const modalTitleSubmit = modal.querySelectorAll('.modal__title-submit')

		// Функция открытия модального окна.
		const openModal = event => {
			// Кнопка, на которую нажали.
			const target = event.target

			modal.classList.add('open')
			// Повесить на страницу обработчик нажатия клавиши "Escape".
			document.addEventListener('keydown', escapeHandler)
			modalTitle.textContent = cardDetailsTitle.textContent
			modalTitleSubmit.value = cardDetailsTitle.textContent
			modalSubtitle.textContent = target.dataset.buttonBuy
		}

		// Функция закрытия модального окна.
		const closeModal = () => {
			modal.classList.remove('open')
			document.removeEventListener('keydown', escapeHandler)
		}

		// Функция-обработчик нажатия клавиши "Escape".
		const escapeHandler = event => {
			// Если нажали на клавишу "Escape":
			if (event.code === 'Escape') {
				closeModal()
			}
		}

		// Закрытие модального окна.
		// Повесить на модальное окно обработчик клика.
		modal.addEventListener('click', event => {
			const target = event.target

			/*
				Если кликнули по кнопке закрытия модального окна или
				по оверлею вокруг модального окна:
			*/
			if (target.classList.contains('modal__close') || target === modal) {
				closeModal()
			}
		})

		// Повесить обработчик клика на кнопку "Купить".
		cardDetailsButtonBuy.addEventListener('click', openModal)
		// Повесить обработчик клика на кнопку "Купить с доставкой".
		cardDetailsButtonDelivery.addEventListener('click', openModal)

		crossSellList.addEventListener('click', event => {
			const target = event.target

			// Если кликнули по кнопке "Купить" карточки дополнительного товара.
			if (target.classList.contains('button_buy')) {
				const parent = target.closest('.cross-sell__item')
				const cardTitle = parent.querySelector('.cross-sell__title')

				modal.classList.add('open')
				// Повесить на страницу обработчик нажатия клавиши "Escape".
				document.addEventListener('keydown', escapeHandler)
				modalTitle.textContent = cardTitle.textContent
				modalTitleSubmit.value = cardTitle.textContent
				modalSubtitle.textContent = target.dataset.buttonBuy
			}
		})
	}

	// Функция отображает дополнительные товары на странице.
	const renderCrossSell = () => {
		// Количество дополнительных товаров, отображаемых за один раз.
		const COUNT_ROW_GOODS = 4
		// Количество всех дополнительных товаров.
		let countAllGoods = 0

		// Контейнер для дополнительных товаров.
		const crossSellList = document.querySelector('.cross-sell__list')
		// Кнопка показа дополнительных товаров "Показать ещё".
		const crossSellAdd = document.querySelector('.cross-sell__add')

		// Все дополнительные товары.
		const allGoods = []
		// Функция добавления на страницу дополнительных товаров.
		let wrapRender = null

		// Функция переставляет элементы массива в случайном порядке.
		const shuffle = arr => arr.sort(() => Math.random() - 0.5)

		// Функция принимает объект с данными товара и создаёт карточку товара.
		const createCrossSellItem = ({ photo: picture, name, price }) => {
 			const liItem = document.createElement('li')
			liItem.innerHTML = `
				<article class="cross-sell__item">
					<img class="cross-sell__image" src=${picture} alt="${name}">
					<div class="cross-sell__inner-wrapper">
						<h3 class="cross-sell__title">${name}</h3>
						<p class="cross-sell__price">${price}₽</p>
						<button type="button" class="button button_buy cross-sell__button" data-button-buy="Оплата">Купить</button>
					</div>
				</article>
			`
			return liItem
		}

		/*
			Функция добавляет на страницу дополнительные товары.
		*/
		const render = arr => {
			arr.forEach(item => {
				crossSellList.append(createCrossSellItem(item))
			})
		}

		/*
			Функция-обёртка принимает оборачиваемую функцию и количество её
			допустимых запусков. Позволяет запустить переданную функцию
			НЕ более переданного количества раз.
		*/
		const wrapper = (fn, count) => {
			let counter = 0
			return (...args) => {
				/*
					Если счётчик равен количеству допустимых запусков,
					ничего не делать.
				*/
				if (counter === count) {
					return
				}

				counter++
				return fn(...args)
			}
		}

		// Функция заполняет товарами контейнер для дополнительных товаров.
		const createCrossSellList = goods => {
			countAllGoods = goods.length

			/*
				Функция добавления на страницу дополнительных товаров.
				Принимает функцию добавления товаров и количество отрисовок, необходимых для отображения на странице всех
				дополнительных товаров по количеству,
				отображаемому за одну отрисовку.
			*/
			wrapRender = wrapper(render,
				Math.ceil(goods.length/COUNT_ROW_GOODS))

			// Все дополнительные товары, перемешанные в случайном порядке.
			allGoods.push(...shuffle(goods))
			// Вырезать 4 первых товара из всех дополнительных.
			const fourItems = allGoods.splice(0, COUNT_ROW_GOODS)
			render(fourItems)
		}

		/*
			Повесить обработчик клика по кнопке показа
			дополнительных товаров "Показать ещё".
		*/
		crossSellAdd.addEventListener('click', () => {
			wrapRender(allGoods.splice(0, COUNT_ROW_GOODS))

			// Если отрисованы все карточки дополнительных товаров:
			if (crossSellList.querySelectorAll('.cross-sell__item')
			.length === countAllGoods) {
				// Удалить кнопку отображения всех дополнительных товаров.
				crossSellAdd.remove()
			}
		})

		getData('./cross-sell-dbase/dbase.json', createCrossSellList)
	}

	tabs()
	accordion()
	modal()
	renderCrossSell()
	// Запуск работы адаптивного меню.
	amenu('.header__menu', '.header-menu__list',
		'.header-menu__item', '.header-menu__burger')
})