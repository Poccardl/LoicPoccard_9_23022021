import { fireEvent, screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import '@testing-library/jest-dom/extend-expect'

import { localStorageMock } from "../__mocks__/localStorage.js"
import Bills  from "../containers/Bills.js"
import { ROUTES } from "../constants/routes"

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: []})
      document.body.innerHTML = html
      //to-do write expect expression
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    test('Then, Loading page should be rendered', () => {
      const html = BillsUI({ loading: true })
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
    test('Then, Error page should be rendered', () => {
      const html = BillsUI({ error: 'some error message' })
      document.body.innerHTML = html
      expect(screen.getAllByText('Erreur')).toBeTruthy()
    })
  })
  describe('When I click on the Create a new bill button', () => {
		test('Then I should be sent to the NewBill page', () => {
			Object.defineProperty(window, 'localStorage', {
				value: localStorageMock,
			})
			window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
			const html = BillsUI({ data: [] })
			document.body.innerHTML = html
			const onNavigate = (pathname) => {
				document.body.innerHTML = ROUTES({ pathname })
			}
			const bills = new Bills({ document, onNavigate, firestore: null, localStorage: window.localStorage })
			const button = screen.getByTestId('btn-new-bill')
			const handleClickNewBill = jest.fn((e) => bills.handleClickNewBill(e))
			button.addEventListener('click', handleClickNewBill)
			fireEvent.click(button)
			expect(handleClickNewBill).toHaveBeenCalled()
			// const newBillForm = screen.getByTestId('form-new-bill')
			// expect(newBillForm).toBeTruthy()
		})
	})
	describe('When I click on the Eye Icon button', () => {
		test('Then a modal should open', async () => {
			Object.defineProperty(window, 'localStorage', {
				value: localStorageMock,
			})
			window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
			const html = BillsUI({ data: bills })
			document.body.innerHTML = html
			const onNavigate = (pathname) => {
				document.body.innerHTML = ROUTES({ pathname })
			}
			const bill = new Bills({ document, onNavigate, firestore: null, localStorage: window.localStorage, })
			$.fn.modal = jest.fn()
			const button = screen.getAllByTestId('icon-eye')[0]
			const handleClickIconEye = jest.fn((e) => {
				e.preventDefault()
				bill.handleClickIconEye(button)
			})
			button.addEventListener('click', handleClickIconEye)
			fireEvent.click(button)
			expect(handleClickIconEye).toHaveBeenCalled()
		})
	})
})