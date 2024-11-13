(function () {

	'use strict';

	const ClickyMenus = function (menu) {

		// DOM element(s)
		let container = menu.parentElement,
			currentMenuItem,
			i,
			len;

		this.init = function () {

			menuSetup();
			document.addEventListener('click', closeOpenMenu);

		}


		/*===================================================
		=            Menu Open / Close Functions            =
		===================================================*/

		function toggleOnMenuClick(e) {

			const button = e.currentTarget;

			// close open menu if there is one
			if (currentMenuItem && button !== currentMenuItem) {
				toggleSubmenu(currentMenuItem);
			}

			toggleSubmenu(button);

		};

		function toggleSubmenu(button) {

			console.log('button',button);
			const submenu = document.getElementById(button.getAttribute('aria-controls'));

			if ('true' === button.getAttribute('aria-expanded')) {

				button.setAttribute('aria-expanded', false);
				submenu.setAttribute('aria-hidden', true);
				currentMenuItem = false;

			} else if (button.tagName.toLowerCase() === 'button') {
				button.setAttribute('aria-expanded', true);
				submenu.setAttribute('aria-hidden', false);
				preventOffScreenSubmenu(submenu);
				currentMenuItem = button;
			} 

		};

		// prevents the menu from being displayed off the screen
		function preventOffScreenSubmenu(submenu) {

			const parent = submenu.offsetParent;
			if (parent) {
				const screenWidth = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth,
					// parent = submenu.offsetParent,
					menuLeftEdge = parent.getBoundingClientRect().left,
					menuRightEdge = menuLeftEdge + submenu.offsetWidth;

				if (menuRightEdge + 32 > screenWidth) { // adding 32 so it's not too close
					submenu.classList.add('sub-menu--right');
				}

			}

		}

		function closeOnEscKey(e) {

			// 27 is the code for the esc key
			if (27 === e.keyCode) {

				// we're in a submenu item
				if (null !== e.target.closest('ul[aria-hidden="false"]')) {
					currentMenuItem.focus();
					toggleSubmenu(currentMenuItem);

					// we're on a parent item
				} else if ('true' === e.target.getAttribute('aria-expanded')) {
					toggleSubmenu(currentMenuItem);
				}

			}

		}

		function closeOpenMenu(e) {
			let ulProducts = d.querySelector('#products-submenu');
			console.log('currentMenuItem', currentMenuItem);

			if( currentMenuItem && !e.target.closest('.productsMenu')){
				console.log('fsdfsd');
				currentMenuItem.setAttribute('aria-expanded', false);
				ulProducts.setAttribute('aria-hidden', true);
			} else if (currentMenuItem && !e.target.closest('.site-navigation')) {
				toggleSubmenu(currentMenuItem);
			} 
			

			

		};

		/*===========================================================
		=            Modify Menu Markup & Bind Listeners            =
		=============================================================*/


		function menuSetup() {

			// menu will be all those that have class .clicky-menu

			menu.classList.remove('no-js');

			menu.querySelectorAll('ul').forEach((submenu) => {

				// In this case to the li of products that contains the ul (which contains the products)
				const menuItem = submenu.parentElement;

				if ('undefined' !== typeof submenu) {

					let button = convertLinkToButton(menuItem);

					setUpAria(submenu, button);

					// bind event listener to button
					button.addEventListener('click', toggleOnMenuClick);
					menu.addEventListener('keyup', closeOnEscKey);
					// console.log('learning', menuItem, "2", submenu);
				}

			});

		};

		// converts the first tag "a" child of menuItem into a "button" and removes the href
		function convertLinkToButton(menuItem) {

			const link = menuItem.getElementsByTagName('a')[0],
				linkHTML = link.innerHTML,
				linkAtts = link.attributes,
				button = document.createElement('button');

			if (null !== link) {

				// set button content and attributes
				button.innerHTML = linkHTML.trim();
				for (i = 0, len = linkAtts.length; i < len; i++) {
					let attr = linkAtts[i];
					if ('href' !== attr.name) {
						button.setAttribute(attr.name, attr.value);
					}
				}

				menuItem.replaceChild(button, link);

			}

			return button;

		}

		// gives him an id and an aria (folds the menu and hides it)
		function setUpAria(submenu, button) {

			const submenuId = submenu.getAttribute('id');

			let id;
			if (null === submenuId) {
				// looks for whitespace and replaces it with hyphens, puts it in lowercase and adds '-submenu'
				id = button.textContent.trim().replace(/\s+/g, '-').toLowerCase() + '-submenu';
			} else {
				id = menuItemId + '-submenu';
			}

			// folds the menu and hides it

			// set button ARIA
			button.setAttribute('aria-controls', id);
			button.setAttribute('aria-expanded', false);

			// set submenu ARIA
			submenu.setAttribute('id', id);
			submenu.setAttribute('aria-hidden', true);

			let liMenu = d.querySelectorAll('#products-submenu li');

			console.log("liMenu", liMenu);

			liMenu.forEach((li) => {

				li.addEventListener('click', (e) => toggleOnMenuClick(e));

			});

		}

	}

	// Once the DOM is completely loaded, the tags that have the ".clicky-menu" classes are selected and then each one is passed as an argument to the ClickyMenus class and the .init method is executed

	document.addEventListener('DOMContentLoaded', function () {

		const menus = document.querySelectorAll('.clicky-menu');

		menus.forEach(menu => {

			let clickyMenu = new ClickyMenus(menu);
			clickyMenu.init();

		});

	});


	document.addEventListener('DOMContentLoaded', function () {

		var menuToggle = document.querySelector('.menu-toggle');
		var mainMenu = document.getElementById('main-menu');

		menuToggle.addEventListener('click', function () {
			mainMenu.classList.toggle('open');
		});

	});

	// When you click on a li label in the products submenu, folds it
	let liMenu = d.querySelectorAll('#products-submenu li');
	liMenu.forEach((li) => {

		li.addEventListener('click', (e) => toggleOnMenuClick(e));

	});

}());
