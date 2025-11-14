* Наименование классов:
Разделы: "section_[название раздела]"
Переиспользуемые компоненты: "component_[название компонента]"

* Классы компонентов, лойаутов и страниц начинаются соответствующе: .component_ / .layout_ / .page_

* Табы работают следующим образом:
- Создать элемент с классом .tab-system
- Внутри поместить .tab-trigger и .tab-content с одинаковыми атрибутами data-tab для связи таба с контентом
- Так же есть кастомный селект .tab-select, внутри которого элементы списка li с классом .tab-trigger и соответствующим атрибутом
- Поддерживается вложенность, для этого внутри .tab-content создать свой .tab-system с тригерами и контентом. (У одного элемента не могут быть оба класса .tab-content и .tab-system, в таком случае не сработает)
- Пример:
	<div class="tab-system">
		<div class="tab-trigger" data-tab="tab-1">Tab 1</div>
		<div class="tab-trigger" data-tab="tab-2">Tab 2</div>

		<div class="tab-content" data-tab="tab-1">Content 1</div>
		<div class="tab-content" data-tab="tab-2">
			Content 2
			<div class="tab-system">
				<div class="tab-trigger" data-tab="tab-inner-1">Inner Tab 1</div>
				<div class="tab-trigger" data-tab="tab-inner-2">Inner Tab 2</div>

				<div class="tab-content" data-tab="tab-inner-1">Inner Content 1</div>
				<div class="tab-content" data-tab="tab-inner-2">Inner Content 2</div>
			</div>
		</div>
	</div>

* .slide-show на главной странице работает через счетчик сцен. Когда атрибут data-scene у элемента совпадает с счетчиком, то элемент отображается.
- Для более детального управления (к примеру элемент пропадает с какой-то сцены) секции присваивается счетчик через атрибут data-current-scene