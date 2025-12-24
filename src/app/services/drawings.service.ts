import { Injectable } from '@angular/core';
import { Drawing } from '../models/drawing.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawingsService {
  private _allDrawings: Drawing[] = [
    {
      id: 1,
      image: 'drawings/drawing_001.jpg',
      title: 'A Queen of Angels',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4,
    },
    {
      id: 2,
      image: 'drawings/drawing_002.jpg',
      title: 'Miss Sapphire',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3.5,
    },
    {
      id: 3,
      image: 'drawings/drawing_003.jpg',
      title: 'A Hommage to Anna the Benign',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4.5,
    },
    {
      id: 4,
      image: 'drawings/drawing_004.jpg',
      title: 'Exotic Princess with the Amulet of Light',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4,
    },
    {
      id: 5,
      image: 'drawings/drawing_005.jpg',
      title: 'Angel of Protection and Little Girl',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4.5,
    },
    {
      id: 6,
      image: 'drawings/drawing_006.jpg',
      title: 'A Medieval Carriage',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3,
    },
    {
      id: 7,
      image: 'drawings/drawing_007.jpg',
      title: 'Peace on Earth',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4,
    },
    {
      id: 8,
      image: 'drawings/drawing_008.jpg',
      title: 'A Medieval Ship',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3.5,
    },
    {
      id: 9,
      image: 'drawings/drawing_009.jpg',
      title: 'Caitlin de Caen in an 18th Century Dress',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4.5,
    },
    {
      id: 10,
      image: 'drawings/drawing_010.jpg',
      title: 'Saskia des Esseintes stands by a Stone Staircase',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3.5,
    },
    {
      id: 11,
      image: 'drawings/drawing_011.jpg',
      title: 'The Fountain of Youth',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3,
    },
    {
      id: 12,
      image: 'drawings/drawing_012.jpg',
      title: 'A Wine drinking Monk',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3,
    },
    {
      id: 13,
      image: 'drawings/drawing_013.jpg',
      title: 'Eye of the Manticore',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 3.5,
    },
    {
      id: 14,
      image: 'drawings/drawing_014.jpg',
      title: 'Perchance a Dream',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4,
    },
    {
      id: 15,
      image: 'drawings/drawing_015.jpg',
      title: 'Lumina the Celestial Weaver',
      description: '',
      draughtsman: 'Lucien Delacroix',
      rating: 4,
    },
  ];

  getAll(): Observable<Drawing[]> {
    return of(structuredClone(this._allDrawings).reverse());
  }

  getById(id: number): Observable<Drawing | undefined> {
    const index: number = this._allDrawings.findIndex((item) => item.id === id);

    return new Observable<Drawing | undefined>((observer) => {
      observer.next(index > -1 ? this._allDrawings[index] : undefined);
      observer.complete();
    });
  }

  create(Drawing: Drawing): Observable<void> {
    const nextId: number = Math.max(...this._allDrawings.map((item) => item.id)) + 1;
    Drawing.id = nextId;
    this._allDrawings.push(Drawing);

    return new Observable<void>((obs) => {
      obs.next();
      obs.complete();
    });
  }

  update(Drawing: Drawing): Observable<void> {
    const index: number = this._allDrawings.findIndex((item) => item.id === Drawing.id);

    if (index > -1) {
      const update: Drawing = this._allDrawings[index];
      update.image = Drawing.image;
      update.title = Drawing.title;
      update.description = Drawing.description;
      update.draughtsman = Drawing.draughtsman;
      update.rating = Drawing.rating;
      this._allDrawings[index] = update;
    }

    return new Observable<void>((obs) => {
      obs.next();
      obs.complete();
    });
  }

  delete(Drawing: Drawing): Observable<boolean> {
    const index: number = this._allDrawings.findIndex((item) => item.id === Drawing.id);
    let deleted: boolean = false;

    if (index > -1) {
      this._allDrawings = this._allDrawings.filter((s) => s.id !== Drawing.id);
      deleted = true;
    }

    return new Observable<boolean>((observer) => {
      observer.next(deleted);
      observer.complete();
    });
  }
  
}