


  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      tap(olympics => console.log(olympics)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );



  // Get all datas
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }



  // Get olympic by id for PieChartSample
  getOlympicsForChart(): Observable<any> {
    return this.getOlympics().pipe(
      filter(olympics => olympics && olympics.length > 0), // ignore empty values
      tap(olympics => console.log(olympics)), // log the data
      map((olympics: Olympic[]) => olympics.map((olympic: Olympic) => ({
        name: olympic.country,
        value: olympic.participations.reduce((total: number, p: Participation) => total + p.medalsCount, 0)
      })))
    );
  }

  // Get olympic by country's id
  getOlympicByCountryId(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.id === id)
      )
    );
  }

  // Get olympic by country's name
  getOlympicByCountryName(name: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.country === name)
      )
    );
  }
