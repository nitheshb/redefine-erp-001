import Lottie from 'react-lottie-player'

import loaderData from './loader.json'

//

export default () => (
  <>
    <main className="w-screen h-screen flex justify-center items-center">
      <div>
        <Lottie
          loop
          animationData={loaderData}
          play
          style={{ width: 150, height: 150 }}
        />
      </div>
    </main>
  </>
)
