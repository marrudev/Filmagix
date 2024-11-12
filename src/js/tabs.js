document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize tabs for a specific container
  function initializeTabs(tabsContainer) {
    const tabsList = tabsContainer.querySelector('.tabs-list');
    const tabButtons = tabsList.querySelectorAll('.tab-button');
    const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div, .tabs-panels-portfolio > div');

    tabsList.setAttribute('role', 'tablist');

    // Set roles and initial attributes for each tab button and panel
    tabButtons.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-controls', tabPanels[index].id);
      tabPanels[index].setAttribute('role', 'tabpanel');

      // Display the first panel and mark the first tab as selected on page load
      if (index === 0) {
        tab.setAttribute('aria-selected', 'true');
        tabPanels[index].removeAttribute('hidden'); // Show the first tab panel by default
      } else {
        tab.setAttribute('aria-selected', 'false');
        tabPanels[index].setAttribute('hidden', 'true'); // Hide other panels
      }
    });

    // Click event listener for each tab button
    tabsList.addEventListener('click', e => {
      const clickedTab = e.target.closest('.tab-button');
      if (!clickedTab) return;
      e.preventDefault();
      switchTab(tabsContainer, clickedTab);
    });

    // Keydown event listener for keyboard navigation
    tabsList.addEventListener('keydown', e => {
      const keyMap = {
        ArrowLeft: -1,
        ArrowRight: 1,
        Home: 'first',
        End: 'last'
      };

      const direction = keyMap[e.key];
      if (direction !== undefined) {
        e.preventDefault();
        if (direction === 'first') {
          switchTab(tabsContainer, tabButtons[0]);
        } else if (direction === 'last') {
          switchTab(tabsContainer, tabButtons[tabButtons.length - 1]);
        } else {
          const currentTab = document.activeElement;
          const currentIndex = Array.from(tabButtons).indexOf(currentTab);
          const newIndex = (currentIndex + direction + tabButtons.length) % tabButtons.length;
          switchTab(tabsContainer, tabButtons[newIndex]);
        }
      }
    });
  }

  // Function to switch tabs within a specific container
  function switchTab(tabsContainer, newTab) {
    const tabsList = tabsContainer.querySelector('.tabs-list');
    const tabButtons = tabsList.querySelectorAll('.tab-button');
    const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div, .tabs-panels-portfolio > div');
    const activePanelId = newTab.getAttribute('href').substring(1);
    const activePanel = tabsContainer.querySelector(`#${activePanelId}`);

    // Deactivate all tabs and panels
    tabButtons.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    tabPanels.forEach(panel => {
      panel.setAttribute('hidden', 'true');
    });

    // Activate the new tab and corresponding panel
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    activePanel.removeAttribute('hidden');
    newTab.focus();
  }

  // Initialize all tabs-container elements on the page
  document.querySelectorAll('.tabs-container').forEach(container => {
    initializeTabs(container);
  });
});
