import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import S3 from '../lib/s3'
import useForm from '../lib/use-form'
import { Optional } from '../components/optional'
const fetcher = url => fetch(url).then(r => r.json())

export const ClubsPopup = ({ closed, setClubsOpen, session }) => {
  const { data, error } = useSWR('/api/web/clubs/my', fetcher, {
    refreshInterval: 5000
  })
  let router = useRouter()
  const [starting, setStarting] = useState(data?.clubs.length == 0)
  const { status, submit, useField, setData } = useForm('/api/web/clubs/new', {
    method: 'POST',
    success: 'Club created!',
    closingAction: () => {
      setClubsOpen(false)
      setStarting(false)
    },
    router: router,
    clearOnSubmit: 3500
  })
  return (
    <div
      className="overlay-wrapper"
      style={{ display: closed ? 'none' : 'flex' }}
    >
      <div
        className="overlay"
        style={{
          display: closed ? 'none' : 'flex',
          overflowY: 'scroll',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <h1
          style={{
            fontSize: '2.3em',
            marginBottom: starting ? '-16px' : '-12px'
          }}
        >
          {starting ? 'Create a Club' : 'Your Clubs'}
        </h1>
        {(starting ? [] : data?.clubs)?.map(club => (
          <div
            key={club.id}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => {
              setClubsOpen(false)
              router.push(`/clubs/${club.slug}`)
            }}
          >
            <img
              src={club.logo}
              style={{
                height: '72px',
                width: '72px',
                borderRadius: '8px'
              }}
            />
            <div>
              <h3>{club.name}</h3>
              <div>
                {club.members.length} Member{club.members.length != 1 && 's'} •{' '}
                {club.updates.length} Post{club.updates.length != 1 && 's'}
              </div>
            </div>
          </div>
        ))}

        <details
          style={{
            background: starting ? 'none' : 'var(--colors-elevated)',
            padding: starting ? '0px' : '12px',
            borderRadius: '8px',
            marginTop: starting ? '0px' : '0px'
          }}
          open={starting}
        >
          <summary
            style={{
              cursor: 'pointer',
              fontSize: '1.2em',
              display: starting ? 'none' : 'flex',
              alignItems: 'center',
              paddingTop: '2px'
            }}
            onClick={e => {
              e.preventDefault()
              setStarting(true)
            }}
          >
            <b style={{ flexGrow: 1 }}>Start A Club</b>
            <b style={{ paddingRight: '8px' }}>▶︎</b>
          </summary>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '8px',
              flexDirection: 'column',
              width: '100%',
              position: 'relative'
            }}
          >
            <div style={{ paddingRight: '16px' }}>
              <label
                style={{
                  marginBottom: '8px',
                  display: 'inline-block',
                  fontSize: '1.1em'
                }}
              >
                Club Name
              </label>
              <input
                placeholder="Happy Hack Club"
                required
                {...useField('name', 'text', true)}
              />
            </div>
            <div style={{ paddingRight: '16px' }}>
              <label
                style={{
                  marginBottom: '8px',
                  display: 'inline-block',
                  fontSize: '1.1em'
                }}
              >
                Club Location
              </label>
              <input
                placeholder="Shelburne, Vermont, USA"
                required
                {...useField('location', 'text', true)}
              />
            </div>
            <div style={{ paddingRight: '16px' }}>
              <label
                style={{
                  marginBottom: '8px',
                  fontSize: '1.1em'
                }}
              >
                Club Website
                <Optional />
              </label>
              <input
                placeholder="happy.hackclub.com"
                {...useField('website')}
                type="url"
              />
            </div>
            <button className="lg cta-blue" onClick={() => submit()}>
              Create Club
            </button>
            {starting && (
              <button
                className="lg cta-red"
                onClick={e => {
                  e.preventDefault()
                  setStarting(false)
                  setClubsOpen(false)
                  setData({})
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </details>
      </div>
      <style jsx>
        {`
          ::marker {
            list-style-type: none;
          }

          details summary::-webkit-details-marker {
            display: none;
          }

          details > summary {
            list-style: none;
          }
          details > summary::-webkit-details-marker {
            display: none;
          }
        `}
      </style>
      {!closed && (
        <style>
          {`
        body {
          height: 100%;
          overflow-y: hidden; 
        }  
      `}
        </style>
      )}
      <div
        style={{
          display: closed ? 'none' : 'block',
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          top: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 500,
          left: 0
        }}
        onClick={() => setClubsOpen(false)}
      />
    </div>
  )
}
