import React from 'react';

function OnlyConnectLives({count}) {
  var lives = [];

  for (var i = 0; i < count; i ++) {
    lives.push("dummy");
  }

  return (
    <div className="only-connect-lives">
        {lives.map((life, lifeIndex) =>
            <div className="only-connect-life"></div>
        )}
    </div>
  );
}

export default OnlyConnectLives;
