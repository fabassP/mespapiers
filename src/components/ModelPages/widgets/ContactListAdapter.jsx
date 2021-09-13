import React, { useState, useRef, useEffect } from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Button from 'cozy-ui/transpiled/react/Button'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import RightIcon from 'cozy-ui/transpiled/react/icons/Right'

import { useQuery } from 'src/components/Hooks/useQuery'
import { getCurrentUser } from 'src/utils/queries'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const Contact = ({ onChange, t }) => {
  const ref = useRef(null)
  const {
    data: [currentUser]
  } = useQuery(getCurrentUser)
  const [contact, setContact] = useState(null)

  useEffect(() => {
    if (contact) {
      onChange(contact.id)
      setTimeout(() => ref.current?.click(), 0)
    }
  }, [contact, onChange])

  return (
    <Paper
      elevation={2}
      onClick={() => setContact(currentUser)}
      className={'u-mt-1'}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Avatar
              size={'small'}
              style={{
                color: 'var(--primaryColor)',
                backgroundColor: 'var(--primaryColorLightest)'
              }}
            />
            <button type="submit" hidden ref={ref} />
          </ListItemIcon>
          <ListItemText
            primary={t('ContactListAdapter.me', {
              name: currentUser?.fullname
            })}
          />
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem disabled>
          <ListItemIcon>
            <Avatar
              size={'small'}
              style={{
                color: 'var(--primaryColor)',
                backgroundColor: 'var(--primaryColorLightest)'
              }}
            />
          </ListItemIcon>
          <ListItemText primary={t('ContactListAdapter.other')} />
          <ListItemSecondaryAction>
            <Button
              label={t('ContactListAdapter.other')}
              theme="text"
              icon={RightIcon}
              extension="narrow"
              iconOnly
              className="u-m-0 u-coolGrey"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  )
}

const ContactListAdapter = ({ onChange, schema }) => {
  const { t } = useI18n()

  return (
    <CompositeHeader
      icon={schema.illustration}
      iconSize={'small'}
      title={t(schema.text)}
      text={<Contact onChange={onChange} t={t} />}
    />
  )
}

export default ContactListAdapter
