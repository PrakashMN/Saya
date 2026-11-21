import site from '../site/config'

const words = site.brand.wordmark?.length
  ? site.brand.wordmark
  : site.brand.name.split(' ')
const [firstWord, ...restWords] = words

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="logo">
        {firstWord}
        {restWords.length > 0 && (
          <>
            {' '}
            <span>{restWords.join(' ')}</span>
          </>
        )}
      </div>
      <div className="loading-bar">
        <div className="loading-bar-inner"></div>
      </div>
    </div>
  )
}
