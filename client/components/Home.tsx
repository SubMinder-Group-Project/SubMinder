import Calendar from '@toast-ui/react-calendar'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import '../../node_modules/tui-date-picker/dist/tui-date-picker'
import '../../node_modules/tui-time-picker/dist/tui-time-picker'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchEvents } from '../actions/events'
import UpcomingPayments from './UpcomingPayments'
import { Link } from 'react-router-dom'
import PastPayments from './PastPayments'
import { fetchTrials } from '../actions/trials'

export interface HomeProps {
  isAuthComplete: boolean
}

export interface allEvents {
  id: number
  name: string
  scheduleDate: string
  category: string
  price?: number
  isLastDate?: number | boolean | undefined
}

interface CalendarData {
  id: number
  calendarId: number
  title: string
  body: string
  start: string
  end: string
  category: string
  backgroundColor: string
  isAllDay: boolean
}

export default function Home({ isAuthComplete }: HomeProps) {
  const { getAccessTokenSilently, user } = useAuth0()
  const dispatch = useAppDispatch()
  const { loading, error, data } = useAppSelector((state) => state.events)
  const { data: trialData } = useAppSelector((state) => state.trials)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently()
        dispatch(fetchEvents(token))
        dispatch(fetchTrials(token))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [dispatch, getAccessTokenSilently])

  const [currentView, setView] = useState('month')
  const [currentDate, setCurrentDate] = useState(new Date())

  //CALENDER SET UP
  const calendars = [
    {
      id: 'cal1',
      name: 'Month',
      useCreationPopup: false,
      useDetailPopup: {
        showTimezoneCollapseButton: false,
      },
    },
  ]
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const template = {
    allday(event: any) {
      const { title, body } = event
      return `<div><span style="color: white;">${title}: <span style="font-weight: 400">${body}</span></span></div>`
    },
  }

  const [initialEvents, setInitialEvents] = useState([] as CalendarData[])
  const [trialEvents, setTrialEvents] = useState([] as CalendarData[])

  useEffect(() => {
    if (isAuthComplete) {
      setInitialEvents(
        data.map((data) => {
          return {
            id: data.id,
            calendarId: 1,
            title: data.name,
            body: `$${data.price}`,
            start: data.scheduleDate,
            end: data.scheduleDate,
            category: 'allday',
            color: 'white',
            backgroundColor:
              data.category === 'Travel'
                ? '#5DC6FF'
                : data.category === 'Productivity'
                ? '#C269D6'
                : data.category === 'Bills'
                ? '#FF0000'
                : data.category === 'Necessities'
                ? '#FFC400'
                : data.category === 'Entertainment'
                ? '#06B300'
                : '#0011FF',
            isAllDay: true,
          }
        })
      )

      setTrialEvents(
        trialData.map((data) => {
          return {
            id: data.id,
            calendarId: 1,
            title: data.name,
            body: 'Free trial',
            start: data.scheduleDate,
            end: data.scheduleDate,
            category: 'allday',
            color: 'white',
            backgroundColor: '#17b3a1',
            isAllDay: true,
          }
        })
      )
    }
  }, [isAuthComplete, data, trialData])

  const thisMonths = data.filter((item) => {
    const endDate = new Date(item.scheduleDate)
    return endDate.getMonth() === currentMonth
  })

  const thisMonthsFree = trialData.filter((item) => {
    const schedule = new Date(item.scheduleDate)
    return schedule.getMonth() === currentMonth
  })

  const [payments, setPayments] = useState([] as allEvents[])

  useEffect(() => {
    const newArray = [...thisMonths, ...thisMonthsFree]
    const sortedArray = newArray.sort((a, b) => {
      return (
        new Date(a.scheduleDate).getTime() - new Date(b.scheduleDate).getTime()
      )
    })
    return setPayments(sortedArray)
  }, [trialData, data])

  //-----------Getting the totals-------------
  const categories = [
    'Food & Drink',
    'Entertainment',
    'Necessities',
    'Bills',
    'Productivity',
    'Travel',
  ]

  const categoryTotals: Record<string, number> = {
    'Food & Drink': 0,
    Entertainment: 0,
    Necessities: 0,
    Bills: 0,
    Productivity: 0,
    Travel: 0,
  }

  categories.forEach((category) => {
    const filteredData = data.filter((item) => {
      const endDate = new Date(item.scheduleDate)
      return item.category === category && endDate.getMonth() === currentMonth
    })
    const total = filteredData.reduce((acc, cur) => acc + cur.price, 0)
    categoryTotals[category] = total
  })

  //-----------------------Changing the view----------------------------
  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setView(value)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>There was an error</p>
  }

  let prevDate = 0

  return (
    <>
      <div
        className=" flex justify-around bg-gradient-to-b from-purple-900 to-subminder-indigo"
        style={{ width: '100%', marginBottom: '50px' }}
      >
        <div style={{ width: '15%' }}></div>
        <div>
          <p className="mb-3 text-center text-subminder-nude opacity-80">
            Hi there {user?.nickname}, here are your subscription payments for
          </p>
          <h2 className="mb-10 text-center text-5xl font-bold text-subminder-nude">
            {months[currentMonth]} {currentYear}
          </h2>
        </div>
        <div className="mb-10 self-end">
          <select
            className=" mx-3 appearance-none rounded-xl border border-accent-yellow bg-transparent px-4 py-2 text-center text-accent-yellow focus:outline-none"
            onChange={handleClick}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <Link to="/addsubscription">
            <button className="ml-auto rounded-xl border border-accent-yellow px-4 py-2 font-medium text-accent-yellow">
              Add a new subscription
            </button>
          </Link>
        </div>
      </div>
      <div
        className="ml-auto mr-auto flex justify-center"
        style={{ width: '80%', marginBottom: '200px' }}
      >
        <div className="ml-auto mr-auto w-1/2">
          <div className="p-100px">
            {isAuthComplete ? (
              <Calendar
                height="800px"
                view={currentView}
                events={[...initialEvents, ...trialEvents]}
                calendars={calendars}
                template={template}
              />
            ) : (
              <p>loading...</p>
            )}
          </div>
        </div>
        <div>
          <div>
            <h3 className="text-center text-2xl font-bold text-subminder-indigo">
              Upcoming payments this month
            </h3>
            {payments.map((item) => {
              if (
                new Date(item.scheduleDate).getTime() / 1000 >=
                currentDate.getTime() / 1000
              ) {
                const thisDate = new Date(item.scheduleDate).getDate()
                const isDifferent = thisDate !== prevDate
                prevDate = thisDate

                const date = new Date(item.scheduleDate)
                const structuredDate = date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
                return (
                  <>
                    {isDifferent ? (
                      <h2 className="mt-6 text-center font-bold">
                        {structuredDate}
                      </h2>
                    ) : (
                      ''
                    )}
                    <div key={item.id} className="mb-3">
                      <UpcomingPayments data={item} />
                    </div>
                  </>
                )
              }
            })}
          </div>
          <div>
            <h3 className="mt-10 text-center text-2xl font-bold text-subminder-indigo">
              Past payments
            </h3>
            {payments.map((item) => {
              if (
                new Date(item.scheduleDate).getTime() / 1000 <=
                currentDate.getTime() / 1000
              ) {
                const thisDate = new Date(item.scheduleDate).getDate()
                const isDifferent = thisDate !== prevDate
                prevDate = thisDate

                const date = new Date(item.scheduleDate)
                const structuredDate = date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
                return (
                  <>
                    {isDifferent ? (
                      <h2 className="mt-6 text-center font-bold">
                        {structuredDate}
                      </h2>
                    ) : (
                      ''
                    )}
                    <div key={item.id} className="mb-3">
                      <PastPayments data={item} />
                    </div>
                  </>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}
