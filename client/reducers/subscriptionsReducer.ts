import {
  SET_SUB_PENDING,
  SET_SUB_SUCCESS,
  SET_ERROR,
  SET_SUB_REMOVE,
  SET_SUB_EDIT,
} from '../actions/subscriptions'
import { SubscriptionAction } from '../actions/subscriptions'
import * as Models from '../../models/subscription'
import { Subscription } from '../../models/subscription'

export interface SubscriptionState {
  loading: boolean
  error: string | undefined
  data: Subscription[]
}

const initialState: SubscriptionState = {
  loading: false,
  error: undefined,
  data: [],
}

const subscriptionReducer = (
  state = initialState,
  action: SubscriptionAction
): SubscriptionState => {
  switch (action.type) {
    case SET_SUB_PENDING:
      return {
        loading: true,
        error: undefined,
        data: [],
      }
    case SET_SUB_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case SET_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      }
    case SET_SUB_REMOVE:
      return {
        loading: false,
        error: undefined,
        data: [
          ...state.data.filter((sub) => sub.id !== Number(action.payload)),
        ],
      }
    case SET_SUB_EDIT:
      return {
        loading: false,
        error: undefined,
        data: [
          ...state.data.map((sub) =>
            sub.id === action.payload.id
              ? {
                  ...sub,
                  name: action.payload.name,
                  frequency: action.payload.frequency,
                  website: action.payload.website,
                  price: action.payload.price,
                }
              : sub
          ),
        ],
      }
    default:
      return state
  }
}
export default subscriptionReducer
