export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    users
  };
}

export function receiveTircUsers(tircusers) {
  return {
    type: 'RECEIVE_TIRC_USERS',
    tircusers
  }
}

export function receiveTopic(topic) {
  return {
    type: 'RECEIVE_TOPIC',
    topic
  }
}