import { v4 as uuidv4 } from 'uuid'
import S3 from '../lib/s3'
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
const fetcher = url => fetch(url).then(r => r.json())

export const ClubsEditPopup = ({ closed, setClubsOpen, session, club }) => {
  return (
    <>
      <div
        className="overlay"
        style={{ display: closed ? 'none' : 'block', overflowY: 'scroll' }}
      >
        <h1 style={{ display: 'flex' }}>
          <span style={{ flexGrow: 1, paddingTop: '36px' }}>
            Edit Club Page
          </span>
          <span
            class="noselect"
            style={{
              display: 'inline-block',
              transform:
                'rotate(45deg) scale(1.4) translateX(-11px) translateY(11px)',
              cursor: 'pointer',
              color: 'var(--muted)'
            }}
            onClick={() => setClubsOpen(false)}
          >
            +
          </span>
        </h1>

        <form
          action={`/api/web/clubs/${club.id}/edit`}
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
              Name*
            </label>
            <input
              placeholder="Happy Hack Club"
              required
              name="name"
              defaultValue={club.name}
              style={{ background: 'var(--darker)' }}
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
              Location*
            </label>
            <input
              placeholder="Shelburne, Vermont, USA"
              required
              name="location"
              style={{ background: 'var(--darker)' }}
              defaultValue={club.location}
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
              Banner*
            </label>
            <input
              placeholder="https://hackclub.com/banner.png"
              required
              name="banner"
              style={{ background: 'var(--darker)' }}
              defaultValue={club.banner}
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
              Logo*
            </label>
            <input
              placeholder="https://hackclub.com/logo.png"
              required
              name="logo"
              style={{ background: 'var(--darker)' }}
              defaultValue={club.logo}
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
              Website
            </label>
            <input
              placeholder="happy.hackclub.com"
              type="url"
              name="website"
              style={{ background: 'var(--darker)' }}
              defaultValue={club.website}
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
              Github
            </label>
            <input
              placeholder="github.com/hackclub"
              type="url"
              name="github"
              style={{ background: 'var(--darker)' }}
              defaultValue={club.github}
            />
          </div>
          <button className="lg cta-blue">Save</button>
        </form>
      </div>
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
    </>
  )
}
