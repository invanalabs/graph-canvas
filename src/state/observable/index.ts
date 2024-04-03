interface Observer {
    update(data: any): void;
}

class Observable {
    private observers: Observer[] = [];

    // Method to subscribe an observer
    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    // Method to unsubscribe an observer
    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Method to unsubscribe all observers
    unsubscribeAllObservers(): void {
        this.observers = [];
    }

    // Notify all observers about an update
    notify(data: any): void {
        this.observers.forEach(observer => {
            observer.update(data);
        });
    }
}

class DataModel extends Observable {
    private data: any[] = [];

    // Method to add new data
    addData(item: any): void {
        this.data.push(item);
        this.notify({ type: 'create', item });
    }

    // Method to delete data
    deleteData(index: number): void {
        const deletedItem = this.data.splice(index, 1);
        this.notify({ type: 'delete', item: deletedItem });
    }
}

// Example of an observer
class DataObserver implements Observer {
    update(data: any): void {
        console.log('Update received:', data);
    }
}

// Example usage:
const dataModel = new DataModel();
const observer1 = new DataObserver();
const observer2 = new DataObserver();

// Subscribe observers to the data model
dataModel.subscribe(observer1);
dataModel.subscribe(observer2);

// Add some data
dataModel.addData({ id: 1, name: 'Item 1' });

// Delete data
dataModel.deleteData(0);

// Unsubscribe an observer
dataModel.unsubscribe(observer2);

// Add more data
dataModel.addData({ id: 2, name: 'Item 2' });
