import Controller from '@ember/controller';
import { action } from '@ember/object';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import opacity, { fadeOut } from 'ember-animated/motions/opacity';
import { parallel } from 'ember-animated/-private/scheduler';
import Sprite from 'ember-animated/-private/sprite';

export default class ZoomChildController extends Controller {
  @action
  // eslint-disable-next-line require-yield
  *transition({ insertedSprites, keptSprites, removedSprites }) {
    let spriteElement = document.querySelector('.zoom-beacon');
    if (spriteElement) {
      let beacon = new Sprite(spriteElement, true);
      beacon.measureFinalBounds();

      for (let insertedSprite of insertedSprites) {
        insertedSprite.startAtSprite(beacon);
        insertedSprite.applyStyles({ opacity: '0' });
        parallel(
          scale(insertedSprite),
          move(insertedSprite),
          opacity(insertedSprite, { from: 0, to: 1 })
        );
      }

      for (let keptSprite of keptSprites) {
        parallel(scale(keptSprite), move(keptSprite), opacity(keptSprite));
      }

      for (let removedSprite of removedSprites) {
        removedSprite.endAtSprite(beacon);

        parallel(
          scale(removedSprite),
          move(removedSprite),
          fadeOut(removedSprite)
        );
      }
    }
  }
}
