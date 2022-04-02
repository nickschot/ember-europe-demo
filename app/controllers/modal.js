import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import move from 'ember-animated/motions/move';
import opacity from 'ember-animated/motions/opacity';
import { linear } from 'ember-animated/easings/linear';

export default class ModalController extends Controller {
  @tracked showModal = false;

  @action
  *backdropTransition({
    insertedSprites,
    removedSprites,
    keptSprites,
    duration,
  }) {
    // We yield Promise.all here because we want to wait for this
    // step before starting what comes after.
    yield Promise.all(
      removedSprites.map((s) => {
        if (s.revealed) {
          return opacity(s, {
            to: 0,
            duration: duration / 2,
            easing: linear,
          });
        }
        return undefined;
      })
    );

    for (let sprite of [...insertedSprites, ...keptSprites]) {
      opacity(sprite, {
        to: 1,
        duration: duration / 2,
        easing: linear,
      });
    }
  }

  @action
  // eslint-disable-next-line require-yield
  *modalTransition({ insertedSprites, removedSprites, keptSprites }) {
    for (let insertedSprite of insertedSprites) {
      insertedSprite.startAtPixel({ y: -insertedSprite.finalBounds.height });
      move(insertedSprite, { easing: linear });
    }

    for (let removedSprite of removedSprites) {
      removedSprite.endAtPixel({ y: -removedSprite.initialBounds.height });
      move(removedSprite, { easing: linear });
    }

    for (let keptSprite of keptSprites) {
      move(keptSprite, { easing: linear });
    }
  }
}
