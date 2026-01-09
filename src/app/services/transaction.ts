import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Transaction {

  constructor(private db: Firestore) { }

  getTransactions(): Observable<any[]> {
    const ref = collection(this.db, 'transactions');
    return collectionData(ref, { idField: 'id' });
  }

  getTransactionById(id: string) {
    const ref = doc(this.db, 'transactions', id);
    return getDoc(ref);
  }

  addTransaction(t: any) {
    const ref = collection(this.db, 'transactions');
    return addDoc(ref, t);
  }

  updateById(id: string, t: any) {
    const ref = doc(this.db, 'transactions', id);
    return updateDoc(ref, t);
  }

  deleteById(id: string) {
    const ref = doc(this.db, 'transactions', id);
    return deleteDoc(ref);
  }

  getTotalIncome() {
    return this.getTransactions().pipe(
      map(list =>
        list
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount || 0), 0)
      )
    );
  }

  getTotalExpense() {
    return this.getTransactions().pipe(
      map(list =>
        list
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount || 0), 0)
      )
    );
  }

}
