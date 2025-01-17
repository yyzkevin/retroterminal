function audio_start(url) {
	if(window.audio_started) return;
	window.audio_started=true;
	window.player = new PCMPlayer({
	    encoding: '8bitInt',
	    channels: 1,
	    sampleRate: 22050,
	    flushingTime: 100
	});
	fetch(url).then(function(response) {
		var reader = response.body.getReader();
		function read() {
		    return reader.read().then(({ value, done })=> {
			if(window.player) {
				 for (var i = 0; i < value.byteLength; i++) {
			            value[i] -= 128;
			        }
				window.player.feed(value);
			}
		      if (!window.audio_started) {
		        console.log('playback stopped');
			window.player = null;
		        return;
		      }
		      read()
		    });
		  }
		  read();
	});
}

function audio_stop() {
	window.audio_started=null;
}

